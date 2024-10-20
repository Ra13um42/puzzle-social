<template>
  <div class="py-3 lg:py-34 text-center">

    <h1 class="text-5xl md:text-[4.2rem] font-bold tracking-tight">
      <Text path="login.title" />
    </h1>

    <div class="flex items-center justify-center mt-9 px-3 md:px-0">
      <table class="w-full md:w-auto">
        <tbody>
          <tr>
            <td class="hidden md:table-cell p-2">
              <span class="text-lg text-sub dark:text-sub-dark">
                <Text path="login.email" />
              </span>
            </td>
            <td class="table-cell p-2">
              <input :placeholder="text('login.email')"
                class="px-3 py-[0.45rem] md:py-1.5 border-gray-500 outline-none rounded-md text-lg w-full md:w-60 bg-indigo-50 dark:bg-gray-800"
                v-model="email" v-on:keyup.enter="saveClicked" ref="emailInput" type="email" />
            </td>
          </tr>
          <tr>
            <td class="hidden md:table-cell p-2">
              <span class="text-lg text-sub dark:text-sub-dark">
                <Text path="login.password" />
              </span>
            </td>
            <td class="table-cell p-2">
              <input :placeholder="text('login.password')"
                class="px-3 py-[0.45rem] md:py-1.5 border-gray-500 outline-none rounded-md text-lg w-full md:w-60 bg-indigo-50 dark:bg-gray-800"
                v-model="password" v-on:keyup.enter="saveClicked" ref="passwordInput" type="password" />
            </td>
          </tr>
        </tbody>

      </table>
    </div>

    <div class="flex items-center justify-center gap-x-6 mt-4 text-lg text-red-600" v-if="isError">
      <Text path="login.error" />
    </div>

    <div class="flex items-center justify-center gap-x-6 mt-8">
      <Button color="indigo" @click="loginClicked">
        <Text path="login.button" />
      </Button>
    </div>

    <div class="h-20"></div>

  </div>

</template>


<script setup lang="ts">
import { ref, onMounted, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../service/auth'
import useLanguage from '../service/language'

const router = useRouter()
const { doLogin } = useAuth()
const { text } = useLanguage()

const email = ref('')
const password = ref('')

const emailInput = useTemplateRef('emailInput')
const passwordInput = useTemplateRef('passwordInput')

const isError = ref(false)

onMounted(() => {
  if (emailInput.value)
    emailInput.value.focus()
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
