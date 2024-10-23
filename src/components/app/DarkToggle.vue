<template>

  <div class="flex items-center justify-center select-none" @click="toggleDark">
    <div
      class="relative w-13 h-6.4 flex items-center bg-gray-200 dark:bg-gray-800 border-1 border-gray-300 dark:border-gray-700 rounded-full p-1 cursor-pointer transition-colors duration-200">
      <div
        class="absolute right-.4 dark:right-initial dark:left-.4 w-5 h-5 bg-white dark:bg-black rounded-full shadow-md transform transition-transform duration-200">
      </div>
      <span
        class="absolute left-.3 text-yellow-400 dark:text-gray-700 transition-opacity duration-200 opacity-0 dark:opacity-100">☀️</span>
      <span
        class="absolute right-.3 text-gray-300 dark:text-yellow-200 dark:opacity-0 transition-opacity duration-200">🌙</span>
    </div>
  </div>

</template>

<script setup lang="ts">
import useApp from './../../service/app'

const { toggleDark } = useApp()

</script>


<style></style>