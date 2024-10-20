<template>
  <div>
    <h1 class="text-5xl font-bold tracking-tight md:text-[4.2rem]">
      <Text path="app.title" />
    </h1>

    <p class="mt-5 text-xl leading-8 text-sub dark:text-sub-dark">
      <Text path="signup.name_question" />
    </p>

    <div class="mt-8 flex items-center justify-center px-6 lg:px-5 py-1 gap-x-6">
      <input :placeholder="text('signup.name')"
        class="bg-indigo-50 dark:bg-gray-800 px-3 py-[0.4rem] md:py-1.5 w-full md:w-60 border-gray-700 outline-none rounded-md text-lg placeholder-gray-500 border-red-400"
        :class="{ 'border-2': nameError }" v-model="signupData.name" v-on:keyup.enter="okClicked" ref="nameInput"
        type="text" />
    </div>

    <div class="mt-5 text-lg text-red-600 flex items-center justify-center gap-x-6" v-if="message">
      {{ message }}
    </div>

    <div class="mt-9 flex items-center justify-center gap-x-6">
      <Button color="indigo" @click="okClicked">
        <Text path="signup.name_confirm_button" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, useTemplateRef } from 'vue'
import useSignup from '../../service/signup'
import useLanguage from '../../service/language'
import isMobile from 'is-mobile'

const { signupData, message, nextStep } = useSignup()
const { text } = useLanguage()

const nameInput = useTemplateRef('nameInput')
const nameError = ref(false)


const okClicked = () => {
  if (!signupData.value.name) {
    nameError.value = true

    if (nameInput.value)
      nameInput.value.focus()

  } else if (signupData.value.name.length < 2) {
    message.value = 'Username zu kurz'
  } else {
    nextStep()
  }
}

onMounted(() => {
  if (nameInput.value && !isMobile())
    nameInput.value.focus()
})
</script>

<style scoped></style>