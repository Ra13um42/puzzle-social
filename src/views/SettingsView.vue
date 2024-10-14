<template>
  <div class="py-10 lg:py-15 max-w-screen-lg mx-auto">
    <h1 class="text-4xl font-bold tracking-tight text-gray-900">Einstellungen.</h1>
    <p class="mt-6 text-lg leading-8 text-gray-600">Account settings.</p>

    <p class="block mt-22 text-2xl leading-8 text-gray-800">Account löschen</p>
    <button
      class="cursor-pointer ml-0 mt-4 rounded-md bg-red-700 px-6 py-2.25 text-sm font-semibold text-white shadow-sm shadow-gray-300 hover:bg-red-600"
      @click="deleteAccountClick">Löschen</button>
  </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router'
import useApp from './../service/app'
import useUser from './../service/user'
import useAuth from './../service/auth'

const router = useRouter()

const { showModal } = useApp()
const { deleteAccount } = useUser()
const { doLogout } = useAuth()


const deleteAccountClick = () => {
  showModal('Account wirklich löschen?', true, yesClicked)
}

const yesClicked = () => {
  deleteAccount().then(() => {
    doLogout()
    router.push({ path: '/' })
    showModal('Account gelöscht.')
  })
}

</script>


<style></style>
