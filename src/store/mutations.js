import Cookies from 'js-cookie'

export const changeLoggedState = (state, val) => {
  state.logged = val
  Cookies.set('logged', val)
}

export const initArticleCatalogState = (state, val) => {
  state.arcitleCatalog = val
}