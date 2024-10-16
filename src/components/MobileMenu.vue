<script setup lang="ts">
import { useRouter } from 'vue-router'
import useAuth from '../service/auth'
import useApp from './../service/app'

const router = useRouter()
const { mobileMenuVisible, hideMobileMenu } = useApp()
const { loggedin, user, doLogout } = useAuth()

const logoutClicked = () => {
  doLogout()
  router.push({ path: '/' })
}
</script>

<template>
  <div v-if="mobileMenuVisible" class="hidden inset-0 z-50 bg-gray-200 bg-opacity-50 flex items-center justify-center"
    :class="{ 'fixed': mobileMenuVisible }">
    <div class="fixed left-0 top-0 bottom-0 z-50 w-80 bg-white shadow-lg">

      <div class="bg-red-600  text-white py-2 px-4 flex justify-between items-center">
        <RouterLink to="/" class="text-[1.5rem] font-semibold">
          <Text path="app.title" />
        </RouterLink>
        <button class="text-white text-3xl" @click="hideMobileMenu">&times;</button>
      </div>

      <nav class="my-4 p-5 space-y-4">
        <RouterLink to="/users" class="block text-black text-lg font-medium hover:text-indigo-600">
          <Text path="app.menu.people" />
        </RouterLink>
        <RouterLink to="/events" class="block text-black text-lg font-medium hover:text-indigo-600">
          <Text path="app.menu.events" />
        </RouterLink>
        <RouterLink to="/locations" class="block text-black text-lg font-medium hover:text-indigo-600">
          <Text path="app.menu.locations" />
        </RouterLink>
      </nav>
      <div class="border-t-2 border-gray-300 p-5 ">

        <RouterLink to="/user" class="cursor-pointer text-gray-800 font-medium rounded-lg text-xl" v-if="loggedin">{{
          user.name }}</RouterLink>

        <RouterLink to="/login"
          class="cursor-pointer text-gray-800 hover:bg-gray-50 font-medium rounded-lg text-md px-2 py-2 2.5 mr-4"
          v-if="!loggedin">
          <Text path="app.login" />
        </RouterLink>

        <RouterLink to="/signup"
          class="cursor-pointer text-white bg-indigo-700 hover:bg-indigo-600 font-medium rounded-lg text-md px-5 py-2.5 mr-2"
          v-if="!loggedin">
          <Text path="app.signup" />
        </RouterLink>

        <a @click="logoutClicked" v-if="loggedin"
          class="cursor-pointer text-white bg-indigo-700 hover:bg-indigo-600 font-medium rounded-lg text-md px-4 py-2.5 ml-6 mr-2">
          <Text path="app.logout" />
        </a>

        <RouterLink to="/user" v-if="loggedin" class="block text-black text-lg font-medium hover:text-indigo-600 mt-12">
          <Text path="app.your_profile" />
        </RouterLink>

        <RouterLink to="/settings" v-if="loggedin"
          class="block text-black text-lg font-medium hover:text-indigo-600 py-4">
          <Text path="app.settings" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>
