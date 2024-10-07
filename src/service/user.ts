import { reactive, toRefs } from "vue";
import { fetchUsers, updateName } from '../api/user'

const state = reactive({
  users: new Array as User[],
  message: String
})

const getUsers = async () => {
  try {
    const userResult: Array<User> = await fetchUsers()
    state.users = userResult
    return userResult
  }
  catch(error: any) {
    const response = error.response.data
    state.message = Array.isArray(response.message) ? response.message[0] : response.message
    throw error
  }
}

const doUpdateName = async (name: string) => {
  try {
    await updateName(name)
  } catch(error: any) {
    throw new Error()
  }
}

export default function useUsers() {
  return {
    ...toRefs(state),
    getUsers,
    doUpdateName
  }
}
