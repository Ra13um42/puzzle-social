<template>
  <h1 class="text-5xl font-bold tracking-tight text-gray-900 md:text-[4.2rem]">
    <span> {{ signupData.name }}.</span>
  </h1>

  <p class="mt-5 text-xl leading-8 text-gray-600">
    <Text path="signup.email_password" />
  </p>

  <div class="mt-6 px-5 md:px-0">
    <table class="w-full md:w-auto mx-auto">
      <tbody>
        <tr>
          <td class="p-2 hidden md:table-cell">
            <span class="text-lg text-gray-700">
              <Text path="signup.email" />
            </span>
          </td>
          <td class="p-2 table-cell">
            <input :placeholder="text('signup.email')"
              class="px-3 py-[0.45rem] md:py-1.5 border-gray-500 outline-none rounded-md text-lg w-full md:w-60 bg-indigo-50"
              v-model="signupData.email" v-on:keyup.enter="saveClicked" ref="emailInput" type="email" />
          </td>
        </tr>
        <tr>
          <td class="p-2 hidden md:table-cell">
            <span class="text-lg text-gray-700">
              <Text path="signup.password" />
            </span>
          </td>
          <td class="p-2 table-cell">
            <input :placeholder="text('signup.password')"
              class="px-3 py-[0.45rem] md:py-1.5 border-gray-500 outline-none rounded-md text-lg w-full md:w-60 bg-indigo-50"
              v-model="signupData.password" v-on:keyup.enter="saveClicked" ref="passwordInput" type="password" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="mt-5 text-lg text-red-600 flex items-center justify-center gap-x-6" v-if="message">
    {{ message }}
  </div>

  <div class="mt-10 flex items-center justify-center gap-x-6">
    <Button color="indigo" @click="saveClicked" class="!px-5">
      <Text path="signup.create_account" />
    </Button>
  </div>

</template>

<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import useSignup from '../../service/signup'
import useLanguage from '../../service/language'
import isMobile from 'is-mobile'

const router = useRouter()
const { doSignup, signupData, message } = useSignup()
const { text } = useLanguage()

const emailInput = useTemplateRef('emailInput')
const passwordInput = useTemplateRef('passwordInput')

const saveClicked = () => {
  doSignup().then(() => {
    router.push({ path: '/user' })
  })
}

onMounted(() => {
  if (emailInput.value && !isMobile())
    emailInput.value.focus()
})

</script>

<style scoped></style>