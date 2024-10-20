import { reactive, toRefs } from "vue"
import { setAuthToken } from '../api/http'
import { login, type LoginResponse, checkAuth } from '../api/auth'

const state = reactive({
  user: new Object as User,
  loggedin: false,
  authChecked: false,
})

const doLogin = async (data: any) => {
  try {
    const loginResult: LoginResponse = await login(data)
    setUser(loginResult.user)
    setAccessToken(loginResult.access_token)
  } catch(error: any) {
    throw error
  }
}

const setUser = (user: User) => {
  state.user = user
}

const setAccessToken = (token: string) => {
  localStorage.setItem('access_token', JSON.stringify(token))
  setAuthToken(token)
  state.loggedin = true
}

const resetAccessToken = () => {
  localStorage.setItem('access_token', '')
  setAuthToken(null)
  state.loggedin = false
}

const doLogout = () => {
    state.user = new Object as User
    resetAccessToken()
}

const doCheckAuth = async () => {
  const tokenString = localStorage.getItem('access_token')

  if (tokenString) {
    const access_token = JSON.parse(tokenString)
    setAuthToken(access_token)
  }

  try {
    state.user = await checkAuth()
    state.loggedin = true
  } catch(error) {
    state.loggedin = false
  } finally {
    state.authChecked = true
  }
}

export default function useAuth() {
  return {
    ...toRefs(state),
    doCheckAuth,
    doLogin,
    doLogout,
    setUser,
    setAccessToken
  }
}
