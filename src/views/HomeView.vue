<template>
  <div>
    <div class="flex flex-col md:flex-row w-full justify-center mt-28 md:mt-50">
      <img src="../assets/puzzles.jpg"
        class="h-full mx-auto w-29 md:w-33.5 md:mx-0 -mt-17 md:-ml-[0.50rem] md:order-last">
      <img src="../assets/Puzzle Social.jpeg"
        class="h-full mx-auto md:mx-0 w-57 md:w-70 md:ml-11 -mt-0.3 lg:mt-0 md:order-first">
    </div>

    <div class="text-center">
      <p class="mt-2.2 md:mt-1 text-gray-600 text-[1.22rem] md:text-[1.24rem] leading-8">
        <Text path="app.subtitle"></Text>
      </p>

      <div class="flex items-center justify-center gap-x-6 mt-11 md:mt-13" v-if="!loggedin">
        <RouterLink to="/signup"
          class="text-sm text-white bg-red-700 hover:bg-red-600 sm:shadow-gray-300 cursor-pointer rounded-xl font-semibold px-8 py-2.5">
          <Text path="app.start" />
        </RouterLink>
        <RouterLink to="/login" class="cursor-pointer text-sm font-semibold leading-6 text-gray-900">
          <Text path="app.login" />
        </RouterLink>
      </div>

      <div class="flex items-center justify-center mt-11 md:mt-10 gap-x-6" v-if="loggedin">
        <RouterLink to="/user"
          class="cursor-pointer rounded-md bg-indigo-600 px-6.3 py-2.5 text-sm font-semibold text-white shadow-sm shadow-gray-300 hover:bg-indigo-500">
          <Text path="app.your_profile" />
        </RouterLink>
      </div>

      <UsersDisplay />

    </div>
  </div>
</template>


<script setup lang="ts">
import useAuth from '../service/auth'
import UsersDisplay from '../components/UsersDisplay.vue'

const { loggedin } = useAuth()

</script>
