<template>

  <div class="flex flex-wrap justify-between items-center mx-auto">

    <div class="flex items-center cursor-pointer">
      <RouterLink to="/" class="text-indigo-700 dark:text-red-500 text-[1.6rem] font-semibold">
        <Text path="app.title" />
      </RouterLink>
    </div>

    <div class="hidden lg:flex w-full lg:w-auto justify-between items-center">
      <ul class="flex flex-col lg:flex-row mt-4 lg:mt-0 lg:space-x-8 font-medium">
        <li>
          <Link to="/people">
          <Text path="app.menu.people" />
          </Link>
        </li>
        <li>
          <Link to="/events">
          <Text path="app.menu.events" />
          </Link>
        </li>
        <li>
          <Link to="/locations">
          <Text path="app.menu.locations" />
          </Link>
        </li>
      </ul>
    </div>

    <div class="flex items-center">

      <button class="inline h-[1.45rem] md:h-[1.65rem] ml-1.5 mr-2 md:mr-5 mt-.5 md:mt-1 cursor-pointer"
        @click="toggleDark">toggle</button>


      <LanguageDropdown />

      <div class="hidden lg:flex items-center" v-if="loggedin">
        <Button to="/settings" color="transparent" class="!px-4 !text-[1rem]">
          ⚙️
        </Button>

        <Button to="/user" color="transparent" class="!text-[1rem]">
          {{ user.name }}
        </Button>

        <Button color="indigo" @click="logout" class="!px-6.5">
          <Text path="app.logout" />
        </Button>
      </div>

      <div class="hidden lg:flex" v-if="!loggedin">
        <Button to="/login" color="transparent">
          <Text path="app.login" />
        </Button>

        <Button to="/signup" color="indigo" class="!px-5">
          <Text path="app.register" />
        </Button>
      </div>

      <Button color="transparent" @click="showMobileMenu" class="block lg:hidden !px-6 -mr-4">
        <svg class="w-6 h-6 text-gray-500 -mt-.5" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"></path>
        </svg>
      </Button>

    </div>

  </div>

</template>


<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import useAuth from '../../service/auth'
import useApp from './../../service/app'
import LanguageDropdown from '../language/LanguageDropdown.vue'

const router = useRouter()

const { loggedin, doLogout, user } = useAuth()
const { showMobileMenu, toggleDark } = useApp()

const logout = () => {
  doLogout()
  router.push({ path: '/' })
}
</script>
