import { effect } from '@preact/signals'
import { render } from 'preact'

import App from './app'

import { fetchDataFromAPI, loading } from './globalState'

fetchDataFromAPI()

effect(() => {
  document.documentElement.setAttribute(
    'class',
    loading.value ? 'loading' : 'loaded'
  )
})

render(<App />, document.getElementsByClassName('app')[0])
