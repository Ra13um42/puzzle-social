<template>
  <div class="mx-auto max-w-2xl py-1 lg:py-17 xl:py-20 mb-30">
    <div class="text-center">
      <h1 class="text-5xl md:text-[4rem] font-bold tracking-tight text-gray-900">{{ profileUser?.name }}</h1>
      <p class="mt-6 text-xl leading-8 text-gray-600" v-if="own">Dein Profil.</p>
      <p class="mt-6 text-xl leading-8 text-gray-600" v-if="!own">Profil auf Puzzle.</p>

      <div class="px-8 md:p-0 min-h-50">
        <img :src="photoUrl()" class="inline rounded-lg mx-auto md:max-w-79 mt-10" v-if="loaded">
        <photo-upload @uploaded="photoUploaded" url="users/me/photo" class="mx-auto" v-if="own"></photo-upload>
      </div>

      <div class="flex items-center justify-center gap-x-6 mt-8 pb-24">
        <button
          class="cursor-pointer mt-3 rounded-md bg-white px-7.5 py-2.25 text-sm font-semibold text-black shadow-sm shadow-gray-300 hover:bg-gray-100"
          aria-current="page" v-if="userId" @click="goBack">Zurück</button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useAuth from '../service/auth'
import PhotoUpload from '../components/PhotoUpload.vue'
import axios from 'axios';

const route = useRoute()
const router = useRouter()
const { user } = useAuth()

const userId = ref()
const profileUser = ref<User>()
const own = ref(false)

const about = ref('')
const name = ref('')

const loaded = ref(false)

const goBack = () => {
  router.go(-1)
}

const photoUrl = () => {
  if (profileUser.value?.photo) {
    return '../static/photos/' + profileUser.value.photo
  } else {
    return '../static/avatar'
  }
}

const photoUploaded = (fileName: string) => {
  user.value.photo = fileName
  if (profileUser.value)
    profileUser.value.photo = fileName
}

const getData = (userId: string) => {
  axios.get('users/' + userId)
    .then(function (response) {
      profileUser.value = response.data
      if (userId == user.value._id)
        own.value = true
      loaded.value = true
    })
    .catch(function (error) {
      console.log(error)
    })
}

onBeforeMount(() => {
  const { id } = route.params
  if (id) {
    userId.value = id
    getData(id as string)
  } else {
    profileUser.value = user.value
    own.value = true
    loaded.value = true
  }
})

</script>


<style></style>
