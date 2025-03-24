import { signal } from '@preact/signals'

export const loading = signal(null)
export const error = signal(null)
export const data = signal(null)

export function fetchDataFromAPI() {
  loading.value = true
  error.value = null

  fetch('./api/data.json')
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok')
      return res.json()
    })
    .then(result => {
      data.value = result
    })
    .catch(err => {
      error.value = err.message || 'Failed to load data from server'
    })
    .finally(() => {
      loading.value = false
    })
}
