<template>
  <div class="py-3 lg:py-34 text-center">

    <h1 class="text-gray-900 text-5xl md:text-[4.2rem] font-bold tracking-tight">Login.</h1>

    <div class="flex items-center justify-center mt-9 px-3 md:px-0">
      <table class="w-full md:w-auto">
        <tbody>
          <tr>
            <td class="hidden md:table-cell p-2">
              <span class="text-lg text-gray-700">E-Mail</span>
            </td>
            <td class="table-cell p-2">
              <input placeholder="E-Mail"
                class="px-3 py-[0.45rem] md:py-1.5 border-gray-500 outline-none rounded-md text-lg w-full md:w-60 bg-indigo-50"
                v-model="email" v-on:keyup.enter="saveClicked" ref="emailInput" type="email" />
            </td>
          </tr>
          <tr>
            <td class="hidden md:table-cell p-2">
              <span class="text-lg text-gray-700">Passwort</span>
            </td>
            <td class="table-cell p-2">
              <input placeholder="Passwort"
                class="px-3 py-[0.45rem] md:py-1.5 border-gray-500 outline-none rounded-md text-lg w-full md:w-60 bg-indigo-50"
                v-model="password" v-on:keyup.enter="saveClicked" ref="passwordInput" type="password" />
            </td>
          </tr>
        </tbody>

      </table>
    </div>

    <div class="flex items-center justify-center gap-x-6 mt-4 text-lg text-red-600" v-if="isError">
      Login nicht erfolgreich
    </div>

    <div class="flex items-center justify-center gap-x-6 mt-8">
      <button
        class="rounded-xl bg-indigo-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm shadow-gray-300 hover:bg-indigo-500 outline-none"
        @click="loginClicked" ref="saveButton">Login</button>
    </div>

    <div class="h-20"></div>

  </div>

</template>


<script setup lang="ts">
import { ref, onMounted, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../service/auth'

const router = useRouter()
const { doLogin } = useAuth()

const email = ref('')
const password = ref('')

const emailInput = useTemplateRef('emailInput')
const passwordInput = useTemplateRef('passwordInput')

const isError = ref(false)

onMounted(() => {
  setTimeout(() => {
    if (emailInput.value)
      emailInput.value.focus()
  }, 30);
})

const saveClicked = () => {
  loginClicked()
}

const loginClicked = () => {
  const loginData = {
    email: email.value,
    password: password.value
  }
  doLogin(loginData).then(() => {
    router.push({ path: '/user' })
  }).catch((error) => {
    isError.value = true
  })
}
</script>


<style></style>
