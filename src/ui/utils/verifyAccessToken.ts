import { store } from './store'

const createdStr = window.sessionStorage.getItem('token-ts')
if (createdStr) {
  const created = parseInt(createdStr)
  if (created < (Date.now() / 1000) - 7200) {
    window.sessionStorage.clear()
  }
}

const token = window.sessionStorage.getItem('token')

if (token) {
  window.fetch('/auth/verify', {
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      authorization: 'Bearer ' + token
    }
  })
    .then((response) => response.json())
    .then((json => {
      store.commit('setLoginData', json)
    }))
    .catch((error: Error) => {
      console.error(error)
    })
}
