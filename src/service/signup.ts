import { reactive, ref, toRefs, shallowRef, type Component } from "vue"
import { signup, type SignupData, type SignupResponse } from '../api/auth'
import useAuth from './auth'
import NameSet from '../components/signup/NameSet.vue'
import LoginData from '../components/signup/LoginData.vue'

const state = reactive({
  signupData: ref<SignupData>(new Object as SignupData),
  message: ''
})

const stepComponent: Component = shallowRef(NameSet)
const { setUser, setAccessToken } = useAuth()


const doSignup = async () => {
  try {
    const signupResult: SignupResponse = await signup(state.signupData)
    setUser(signupResult.user)
    setAccessToken(signupResult.access_token)
  }
  catch(error: any) {
    state.message = error.message
    throw error
  }
}

const nextStep = () => {
  stepComponent.value = LoginData
  state.message = ''
}

const reset = () => {
  state.signupData = new Object() as SignupData
  stepComponent.value = NameSet
  state.message = ''
}

export default function useSignup() {
  return {
    ...toRefs(state),
    doSignup,
    nextStep,
    stepComponent,
    reset
  }
}
