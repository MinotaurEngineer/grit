import fs from 'node:fs'
import { extname, join, normalize, resolve } from 'node:path'

const ssiRegex = /<!--\s*include\s+file=['"](.*?)['"].*?-->/g
const processedFiles = new Set()

const root = normalize(resolve(process.cwd()))

function getFileType(filePath) {
  const ext = extname(filePath).toLowerCase()
  switch (ext) {
    case '.css':
      return 'css'
    case '.js':
      return 'js'
    case '.html':
      return 'html'
    case '.svg':
      return 'svg'
    case '.json':
      return 'json'
    default:
      return null
  }
}

function formatContent(fileType, content) {
  // Handle different file types
  switch (fileType) {
    case 'css':
      return `<style>${content}</style>`
    case 'js':
      return `<script type="module">${content}</script>`
    case 'json':
      return `<script type="application/json">${content}</script>`
    default:
      return content
  }
}

function processIncludes(code = null, currentPath = root) {
  if (!code) return ''

  return code.replace(ssiRegex, (match, filePath) => {
    const fileType = getFileType(filePath)
    if (!fileType) return match

    const includePath = resolve(join(currentPath, filePath))

    // Prevent circular includes
    if (processedFiles.has(includePath)) {
      console.warn(`Circular inclusion detected: ${includePath}`)
      return `<!-- Circular inclusion prevented: ${filePath} -->`
    }

    // Track processed files
    processedFiles.add(includePath)

    try {
      // Read and process the included file
      const content = fs.readFileSync(includePath, 'utf-8')

      // Recursively process any includes in the included file
      const processedContent = processIncludes(
        content,
        resolve(includePath, '..')
      )

      // Format the content based on file type
      const formattedContent = formatContent(fileType, processedContent)

      return formattedContent
    } catch (error) {
      console.error(`Error processing include: ${includePath}`, error)
      return `<!-- Failed to include ${filePath}: ${error.message} -->`
    } finally {
      // Remove the file from processed set after we're done with it
      // This allows the same file to be included in different branches
      processedFiles.delete(includePath)
    }
  })
}

export default function viteSSIPlugin() {
  return {
    name: 'vite-plugin-ssi',
    transformIndexHtml(code) {
      processedFiles.clear()
      return processIncludes(code)
    }
  }
}
