import randomstring from 'randomstring'

export const getClientId = (): string => {
  return window.sessionStorage.getItem('client') || ''
}

export const setClientId = (): void => {
  const clientId = getClientId()
  if (clientId === '') {
    window.sessionStorage.setItem('client', randomstring.generate())
  }
}
