export function generateHash(inputString) {
  try {
    const hash = Array.from(inputString).reduce((hash, char) => {
      return (hash << 5) - hash + char.charCodeAt(0)
    }, 0)

    const positiveHash = hash >>> 0

    return `a${positiveHash.toString(16).padStart(7, '0').slice(0, 7)}`
  } catch (error) {
    console.error('Error compressing string:', error)
    return null
  }
}

export function slugify(arrayOrString) {
  return Array.isArray(arrayOrString)
    ? arrayOrString.map(string => encodeURIComponent(string)).join('-')
    : encodeURIComponent(arrayOrString)
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function navigateWithQueryAndHash({
  queryParams = {},
  hash = null,
  options = { behavior: 'smooth' }
}) {
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')

  const currentPath = window.location.pathname
  const newUrl = `${currentPath}${queryString ? `?${queryString}` : ''}${hash ? `#${hash}` : ''}`

  // Update URL without reload
  window.history.pushState({}, document.title, newUrl)

  // Scroll to the hash target if provided
  await sleep(100)

  if (hash) {
    const element = document.getElementById(hash)

    if (!element) {
      console.warn(`Element with id "${hash}" not found`)
      return false
    }

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
      ...options
    })

    return true
  }
  return true // Success if no hash or scroll needed
}
