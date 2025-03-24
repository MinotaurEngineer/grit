export function getUniqueOptions({
  data,
  property,
  sort = true,
  format = true,
  includeAll = true,
  selector = []
}) {
  if (!data || !Array.isArray(data)) return []

  const uniqueSet = new Set()
  const validValues = new Set()

  const filteredData =
    selector.length === 0
      ? data
      : data.filter(program => {
          return selector
            .filter(([key]) => key !== property)
            .every(
              ([key, value]) =>
                program[key] === value || program[key] >= Number.parseInt(value)
            )
        })

  for (const entry of filteredData) {
    if (entry[property] !== undefined && entry[property] !== null) {
      uniqueSet.add(entry[property])
      validValues.add(entry[property])
    }
  }

  const uniqueArray = Array.from(uniqueSet)

  if (sort === true) uniqueArray.sort()

  if (includeAll === true) uniqueArray.unshift('All')

  if (format === false) return uniqueArray

  return uniqueArray.map(value => ({
    value,
    label: value
  }))
}

export function decodeAndValidateParam({
  value = null,
  defaultValue = 'All',
  whitelist = []
}) {
  if (!value || whitelist?.length === 0) return defaultValue
  const decodedValue = decodeURIComponent(value)
  return whitelist.includes(decodedValue) ? decodedValue : defaultValue
}
