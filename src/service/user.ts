import { reactive, toRefs } from "vue";
import { fetchUsers, fetchUser, updateName, updateLocation, type UpdateLocationDto, deleteUser } from '../api/user'

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
    state.message = error.message
    throw error
  }
}

const getUserById = async (userId: string) => {
  return fetchUser(userId)
}

const doUpdateName = async (name: string) => {
  try {
    await updateName(name)
  } catch(error: any) {
    throw new Error()
  }
}

const saveLocation = async (locationData: UpdateLocationDto) => {
  try {
    await updateLocation(locationData)
  } catch(error: any) {
    throw new Error()
  }
}

const deleteAccount = async () => {
  await deleteUser()
}

export default function useUsers() {
  return {
    ...toRefs(state),
    getUsers,
    getUserById,
    doUpdateName,
    saveLocation,
    deleteAccount
  }
}
