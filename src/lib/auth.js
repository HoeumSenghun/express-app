export const AUTH_COOKIE = 'express_app_auth'
export const AUTH_MAX_AGE = 60 * 60 * 24 * 7

export const MOCK_CREDENTIALS = {
  username: 'senghun',
  password: '1234',
}

export function setAuthCookie() {
  if (typeof document === 'undefined') return
  document.cookie = `${AUTH_COOKIE}=1; path=/; max-age=${AUTH_MAX_AGE}; SameSite=Lax`
}

export function clearAuthCookie() {
  if (typeof document === 'undefined') return
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; SameSite=Lax`
}

export function mockLogin(username, password) {
  const u = (username || '').trim().toLowerCase()
  const p = password || ''
  const validUser = MOCK_CREDENTIALS.username.toLowerCase()
  return u === validUser && p === MOCK_CREDENTIALS.password
}
