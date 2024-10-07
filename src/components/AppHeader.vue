<template>

  <div class="flex flex-wrap justify-between items-center mx-auto">

    <div class="flex items-center cursor-pointer">
      <RouterLink to="/" class="text-indigo-700 dark:text-red-500 text-[1.6rem] font-semibold">
        Puzzle.
      </RouterLink>
    </div>

    <div class="hidden lg:flex w-full lg:w-auto justify-between items-center">
      <ul class="flex flex-col lg:flex-row mt-4 lg:mt-0 lg:space-x-8 font-medium">
        <li>
          <RouterLink to="/users"
            class="cursor-pointer block py-2 pr-4 pl-3 hover:text-blue-800 rounded lg:bg-transparent lg:p-0"
            aria-current="page">Menschen</RouterLink>
        </li>
        <li>
          <RouterLink to="/events"
            class="cursor-pointer block py-2 pr-4 pl-3 hover:text-blue-800 rounded lg:bg-transparent lg:p-0"
            aria-current="page">Veranstaltungen</RouterLink>
        </li>
        <li>
          <RouterLink to="/locations"
            class="cursor-pointer block py-2 pr-4 pl-3  hover:text-blue-800 rounded lg:bg-transparent lg:p-0"
            aria-current="page">Treffpunkte</RouterLink>
        </li>
      </ul>
    </div>

    <div class="flex items-center">
      <RouterLink to="/user"
        class="cursor-pointer text-gray-800 font-medium rounded-lg text-md px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hidden md:block"
        v-if="loggedin">{{ user.name }}</RouterLink>

      <RouterLink to="/login"
        class="cursor-pointer text-gray-800 hover:bg-gray-50 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hidden md:block"
        v-if="!loggedin">Login</RouterLink>

      <RouterLink to="/signup"
        class="cursor-pointer text-white bg-indigo-700 hover:bg-indigo-600 font-medium rounded-lg text-sm px-4 lg:px-5 py-2.5 lg:py-2.5 mr-2 hidden md:block"
        v-if="!loggedin">Anmelden</RouterLink>

      <a @click="logout" v-if="loggedin"
        class="cursor-pointer text-white bg-indigo-700 hover:bg-indigo-600 font-medium rounded-lg text-sm px-4 lg:px-5 py-2.5 lg:py-2.5 mr-2 hidden md:block">Logout</a>

      <button class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100"
        @click="showMobileMenu">
        <span class="sr-only">Menu</span>
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"></path>
        </svg>
      </button>
    </div>

  </div>

</template>


<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import useAuth from '../service/auth'
import useApp from './../service/app'

const router = useRouter()

const { loggedin, doLogout, user } = useAuth()
const { showMobileMenu } = useApp()

const logout = () => {
  doLogout()
  router.push({ path: '/' })
}
</script>
