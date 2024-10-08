<template>

  <div class="mx-auto py-14 lg:py-39 text-center">
    <h1 v-if="step == nameStep" class="text-5xl font-bold tracking-tight text-gray-900 md:text-[4.2rem]">Puzzle.</h1>
    <h1 v-if="step == loginDataStep" class="text-5xl font-bold tracking-tight text-gray-900 md:text-[4.2rem]">{{ name
      }}.
    </h1>

    <p v-if="step == nameStep" class="mt-5 text-xl leading-8 text-gray-600">Wie willst du auf Puzzle heißen? </p>
    <p v-if="step == loginDataStep" class="mt-6 text-xl leading-8 text-gray-600">Email und Passwort festlegen. </p>

    <div v-if="step === nameStep">
      <div class="mt-8 flex items-center justify-center px-6 lg:px-5 py-1 gap-x-6">
        <input placeholder="Name"
          class="bg-indigo-50 px-3 py-[0.4rem] md:py-1.5 w-full md:w-60 border-gray-700 outline-none rounded-md text-lg placeholder-gray-500 md:placeholder-opacity-100 border-red-400"
          :class="{ 'border-2': nameError }" v-model="name" v-on:keyup.enter="nameOkClicked" ref="nameInput"
          type="text" />
      </div>

      <div class="mt-5 text-lg text-red-600 flex items-center justify-center gap-x-6" v-if="errorText">
        {{ errorText }}
      </div>

      <div class="mt-9 flex items-center justify-center gap-x-6">
        <button
          class="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-10 py-2.5 text-sm font-semibold text-white shadow-sm shadow-gray-300"
          @click="nameOkClicked">Ok</button>
      </div>
    </div>

    <div v-if="step === loginDataStep">
      <div class="mt-6 px-5 md:px-0">
        <table class="w-full md:w-auto mx-auto">
          <tbody>
            <tr>
              <td class="p-2 hidden md:table-cell">
                <span class="text-lg text-gray-700">E-Mail</span>
              </td>
              <td class="p-2 table-cell">
                <input placeholder="E-Mail"
                  class="px-3 py-[0.45rem] md:py-1.5 border-gray-500 outline-none rounded-md text-lg w-full md:w-60 bg-indigo-50"
                  v-model="email" v-on:keyup.enter="saveClicked" ref="emailInput" type="email" />
              </td>
            </tr>
            <tr>
              <td class="p-2 hidden md:table-cell">
                <span class="text-lg text-gray-700">Passwort</span>
              </td>
              <td class="p-2 table-cell">
                <input placeholder="Passwort"
                  class="px-3 py-[0.45rem] md:py-1.5 border-gray-500 outline-none rounded-md text-lg w-full md:w-60 bg-indigo-50"
                  v-model="password" v-on:keyup.enter="saveClicked" ref="passwordInput" type="password" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-5 text-lg text-red-600 flex items-center justify-center gap-x-6" v-if="errorText">
        {{ errorText }}
      </div>

      <div class="mt-10 flex items-center justify-center gap-x-6">
        <button
          class="rounded-lg bg-indigo-600 px-6.3 py-2.5 text-sm font-semibold text-white shadow-sm shadow-gray-300 hover:bg-indigo-500 outline-none"
          @click="saveClicked" ref="saveButton">Account erstellen</button>
      </div>

    </div>

    <div class="h-20"></div>
  </div>

</template>


<script setup lang="ts">
import { ref, onMounted, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../service/auth'
import isMobile from 'is-mobile';

const router = useRouter()
const { doSignup } = useAuth()

const nameStep = 'nameStep'
const loginDataStep = 'loginDataStep'
const step = ref(nameStep)

const name = ref('')
const email = ref('')
const password = ref('')

const nameInput = useTemplateRef('nameInput')
const emailInput = useTemplateRef('emailInput')
const passwordInput = useTemplateRef('passwordInput')

const saveButton = ref(null)

const errorText = ref('')
const nameError = ref(false)

onMounted(() => {
  if (nameInput.value && !isMobile())
    nameInput.value.focus()
})

const nameOkClicked = () => {
  if (!name.value) {
    nameError.value = true
    setTimeout(() => {
      if (nameInput.value)
        nameInput.value.focus()
    }, 30);
  } else if (name.value.length < 2) {
    errorText.value = 'Username zu kurz'
  } else {
    step.value = loginDataStep
    errorText.value = ''
    setTimeout(() => {
      if (emailInput.value)
        emailInput.value.focus()
    }, 140);
  }
}

const saveClicked = () => {
  if (step.value == loginDataStep) {
    const signUpData = {
      name: name.value,
      email: email.value,
      password: password.value
    }
    doSignup(signUpData).then(() => {
      router.push({ path: '/user' })
    }).catch((error) => {
      errorText.value = error
    })
  }
}

</script>


<style></style>
