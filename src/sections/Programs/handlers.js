import { useCallback } from 'preact/hooks'
import { useSearchParams } from 'wouter-preact'

export default function handlers() {
  const [_, setSearchParams] = useSearchParams()

  const handleFilter = useCallback(
    ({ name, value }) => {
      setSearchParams(params => {
        if (
          value === null ||
          value === '' ||
          value === 'All' ||
          value === 'undefined'
        ) {
          params.delete(name)
        } else {
          params.set(name, encodeURIComponent(value))
        }

        const sortedParamsArray = Array.from(params.entries()).sort((a, b) =>
          a[0].localeCompare(b[0])
        )
        const sortedParams = new URLSearchParams(sortedParamsArray)

        return sortedParams
      })
    },
    [setSearchParams]
  )

  const handleReset = useCallback(() => {
    setSearchParams(params => {
      const program = params.get('programId')
      const newParams = new URLSearchParams()
      if (program) {
        newParams.set('programId', program)
      }
      return newParams
    })
  }, [setSearchParams])

  return { handleFilter, handleReset }
}
