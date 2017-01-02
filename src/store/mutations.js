import Cookies from 'js-cookie'

export const changeLoggedState = (state, val) => {
  state.logged = val
  Cookies.set('logged', val)
}
