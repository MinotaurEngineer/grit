import { useMemo } from 'preact/hooks'
import { useSearchParams } from 'wouter-preact'

import { data } from '../../globalState'
import { decodeAndValidateParam, getUniqueOptions } from './utils'

export default function state() {
  const [searchParams] = useSearchParams()

  const selector = useMemo(() => {
    return Array.from(searchParams.entries())
      .filter(([key]) => key !== 'programId')
      .map(([key, value]) => [key, decodeURIComponent(value)])
  }, [searchParams])

  const options = useMemo(
    () => ({
      country: getUniqueOptions({
        data: data.value.programs,
        property: 'country',
        selector
      }),
      service: getUniqueOptions({
        data: data.value.programs,
        property: 'service',
        selector
      }),
      branch: getUniqueOptions({
        data: data.value.programs,
        property: 'branch',
        selector
      }),
      difficulty: getUniqueOptions({
        data: data.value.programs,
        property: 'difficulty',
        format: false,
        includeAll: false,
        selector
      })
    }),
    [selector]
  )

  const values = useMemo(
    () => ({
      country: decodeAndValidateParam({
        value: searchParams.get('country'),
        whitelist: options.country.map(({ value }) => value)
      }),
      service: decodeAndValidateParam({
        value: searchParams.get('service'),
        whitelist: options.service.map(({ value }) => value)
      }),
      branch: decodeAndValidateParam({
        value: searchParams.get('branch'),
        whitelist: options.branch.map(({ value }) => value)
      }),
      difficulty: decodeAndValidateParam({
        value: searchParams.get('difficulty'),
        whitelist: options.difficulty.map(n => n.toString()),
        defaultValue: 1
      })
    }),
    [searchParams, options]
  )

  const programs = useMemo(() => {
    if (data.value === null) return []

    if (selector.length === 0) return data.value.programs

    const results = []

    for (const program of data.value.programs) {
      if (
        selector.every(([key, value]) => {
          if (typeof program[key] === 'number') {
            return program[key] >= Number.parseInt(value)
          }
          return program[key] === value
        })
      ) {
        results.push(program)
      }
    }

    return results.toSorted((a, b) => a.name.localeCompare(b.name))
  }, [selector])

  return { options, values, programs }
}
