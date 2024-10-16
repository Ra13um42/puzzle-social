<template>
  <div class="py-10 lg:py-15 max-w-screen-lg mx-auto">
    <h1 class="text-4xl font-bold tracking-tight text-gray-900">
      <Text path="settings.title" />
    </h1>
    <p class="mt-6 text-lg leading-8 text-gray-600">
      <Text path="settings.subtitle" />
    </p>

    <p class="block mt-22 text-2xl leading-8 text-gray-800">
      <Text path="settings.delete_account.title"></Text>
    </p>
    <button
      class="cursor-pointer ml-0 mt-4 rounded-md bg-red-700 px-6 py-2.25 text-sm font-semibold text-white shadow-sm shadow-gray-300 hover:bg-red-600"
      @click="deleteAccountClick">
      <Text path="settings.delete_account.button" />
    </button>


    <p class="block mt-22 text-2xl leading-8 text-gray-800">
      <Text path="settings.language" />
    </p>
    <select placeholder="Sprache auswählen"
      class="px-3 py-[0.45rem] md:py-1.5 mt-7 border-gray-500 outline-none rounded-md cursor-pointer text-lg w-full md:w-60 bg-indigo-50 text-black"
      :value="language.code" @change="onLanguageSelected">
      <option v-for="option in languages" :value="option.code">
        {{ option.name }}
      </option>
    </select>

  </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router'
import useApp from './../service/app'
import useUser from './../service/user'
import useAuth from './../service/auth'
import useLanguage from './../service/language'

const router = useRouter()

const { showModal } = useApp()
const { deleteAccount } = useUser()
const { doLogout } = useAuth()
const { setLanguage, languages, language, getText } = useLanguage()


const deleteAccountClick = () => {
  showModal(getText('settings.delete_account.confirm'), true, yesClicked)
}

const yesClicked = () => {
  deleteAccount().then(() => {
    doLogout()
    router.push({ path: '/' })
    showModal(getText('settings.delete_account.success'))
  })
}

const onLanguageSelected = (event: any) => {
  setLanguage(languages.find((language) => { return language.code === event.target.value }))
}


</script>


<style></style>
