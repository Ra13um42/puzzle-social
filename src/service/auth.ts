import { reactive, toRefs } from "vue";
import axios from 'axios';
import { signup, type SignupData, type SignupResponse, login, type LoginResponse, checkAuth } from '../api/auth'

const state = reactive({
  user: new Object as User,
  loggedin: false,
  authChecked: false,
  showButtons: true
})

const doSignup = async (data: SignupData) => {
  try {
    const signupResult: SignupResponse = await signup(data)
    setUser(signupResult.user)
    setAccessToken(signupResult.access_token)
    state.loggedin = true
    state.showButtons = false
  }
  catch(error: any) {
    const response = error.response.data
    const message = Array.isArray(response.message) ? response.message[0] : response.message
    throw message
  }
}

const doLogin = async (data: any) => {
  try {
    const loginResult: LoginResponse = await login(data)
    setUser(loginResult.user)
    setAccessToken(loginResult.access_token)
    state.loggedin = true
  } catch(error: any) {
    throw error
  }
}

const setUser = (user: User) => {
  state.user = user
}

const setAccessToken = (token: string) => {
  localStorage.setItem('access_token', JSON.stringify(token))
  axios.defaults.headers.common.Authorization = 'Bearer ' + token
}

const resetAccessToken = () => {
  localStorage.setItem('access_token', '')
  axios.defaults.headers.common.Authorization = null
}

const doLogout = () => {
    state.loggedin = false
    state.user = new Object as User
    resetAccessToken()
}

const doCheckAuth = async () => {
  const tokenString = localStorage.getItem('access_token')

  if (tokenString) {
    const access_token = JSON.parse(tokenString)
    axios.defaults.headers.common.Authorization = 'Bearer ' + access_token
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
    doSignup,
    doCheckAuth,
    doLogin,
    doLogout
  }
}
