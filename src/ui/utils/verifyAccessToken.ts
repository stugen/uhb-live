import { store } from './store'

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
