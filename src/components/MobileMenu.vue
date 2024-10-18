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

      <nav class="grid grid-col my-4 p-5 space-y-4">
        <Link to="/users">
        <Text path="app.menu.people" />
        </Link>
        <Link to="/events">
        <Text path="app.menu.events" />
        </Link>
        <Link to="/locations">
        <Text path="app.menu.locations" />
        </Link>
      </nav>

      <div class="border-t-2 border-gray-300 p-5 ">

        <Button color="transparent" to="/login" class="!text-[1rem] !px-2 mr-4" v-if="!loggedin">
          <Text path="app.login" />
        </Button>

        <Button color="indigo" to="/signup" class="!text-[1rem] !px-5 mr-4" v-if="!loggedin">
          <Text path="app.signup" />
        </Button>


        <Button to="/user" color="transparent" class="!px-1 !text-[1rem]" v-if="loggedin">
          {{ user.name }}
        </Button>

        <Button color="indigo" @click="logoutClicked" class="!px-6.5 ml-6 mr-2" v-if="loggedin">
          <Text path="app.logout" />
        </Button>

        <nav class="grid grid-col space-y-4 mt-12">
          <Link to="/user" class="" v-if="loggedin">
          <Text path="app.your_profile" />
          </Link>

          <Link to="/settings" class="mt-12" v-if="loggedin">
          <Text path="app.settings" />
          </Link>
        </nav>


      </div>
    </div>
  </div>
</template>
