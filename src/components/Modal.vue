<script setup lang="ts">
import useApp from './../service/app'

const { hideModal, modalVisible, modalText, yesNo, callback } = useApp()

const yesClicked = () => {
  if (callback.value) {
    callback.value()
  }
  hideModal()
}
</script>


<template>
  <div v-if="modalVisible"
    class="fixed left-0 top-0 bg-gray-200 bg-opacity-50 h-screen w-screen flex items-center justify-center">

    <div class="flex w-auto grow p-2 items-center justify-center">
      <!-- Overlay -->
      <div class="bg-white text-black -mt-32 md:-mt-55 rounded-md shadow-sm w-full max-w-md grow">

        <!-- Header -->
        <div class="bg-indigo-600 text-white py-1.5 px-4 rounded-t-md">
          <h2 class="text-lg font-semibold">
            <Text path="app.title" />
          </h2>
        </div>

        <!-- Content -->
        <div class="p-4">
          <br>
          <p>{{ modalText }}</p>
          <div class="h-10"></div>
          <button
            class="rounded-md bg-indigo-600 px-9 py-2.25 text-sm font-semibold text-white shadow-sm shadow-gray-300 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            @click="hideModal" v-if="!yesNo">
            <Text path="app.ok" />
          </button>

          <div v-else>
            <button
              class="rounded-md bg-indigo-600 px-9 py-2.25 text-sm font-semibold text-white shadow-sm shadow-gray-300 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              @click="yesClicked">
              <Text path="app.yes" />
            </button>
            <button
              class="rounded-md bg-white px-7 ml-4 py-2.25 text-sm font-semibold text-black shadow-sm shadow-gray-300 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              @click="hideModal">
              <Text path="app.cancel" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
