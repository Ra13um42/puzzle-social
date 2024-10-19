<template>
  <div class="mx-auto max-w-screen-lg py-1 lg:py-17 xl:py-20 mb-30">

    <div class="flex flex-col md:flex-row justify-between">
      <div>
        <h1 class="text-5xl md:text-[4rem] font-bold tracking-tight text-gray-900">{{ user?.name }}</h1>
        <p class="mt-6 text-xl leading-8 text-gray-600" v-if="isOwn">
          <Text path="profile.subtitle_own" />
        </p>
        <p class="mt-6 text-xl leading-8 text-gray-600" v-if="!isOwn">
          <Text path="profile.subtitle" />
        </p>

        <div class="px-5 md:p-0 min-h-50">
          <img :src="photoUrl()" class="inline rounded-lg mx-auto md:max-w-79 mt-10" v-if="loaded">
          <photo-upload @uploaded="onPhotoUploaded" url="users/me/photo" v-if="isOwn"></photo-upload>
        </div>
      </div>

      <div class="text-right pt-15">
        <p class="text-xl">
          <Text path="profile.about_me" />
        </p>
        <p class="text-lg text-gray-300">
          <Text path="profile.coming_soon" />
        </p>
        <br><br>
        <p class="text-xl">
          <Text path="profile.social_media" />
        </p>
        <p class="text-lg text-gray-300">
          <Text path="profile.coming_soon" />
        </p>
      </div>
    </div>

    <div>
      <div class="relative mt-14 md:mt-20">
        <span class="mt-6 text-2xl leading-8 text-gray-800">
          <Text path="profile.location.title" />
        </span>

        <div class="inline mt-2 ml-5" v-if="isOwn">

          <Button color="white" size="small" @click="editClicked" v-if="!editLocation && isOwn">
            <span v-if="!user?.location">
              <Text path="profile.location.set" />
            </span>
            <span v-else>
              <Text path="profile.location.change" />
            </span>
          </Button>

          <Button color="white" size="small" @click="editCancel" v-if="editLocation">
            <Text path="profile.location.cancel" />
          </Button>

          <LocationEdit @locationSelected="onLocationSelected" @locationSaved="onLocationSaved" :locationData="mapData"
            v-if="editLocation && isOwn" class="mb-10" />
        </div>


        <div class="mt-5" v-if="mapData">{{ mapData?.location?.display_name }}</div>
        <div class="mt-5 text-lg text-gray-300"
          v-if="!user?.location && !mapData?.location?.display_name && !editLocation">
          <Text path="profile.location.not_set" />
        </div>
        <div class="mt-10" v-if="notFound">
          <Text path="profile.location.no_result" />
        </div>


        <MapDisplay :locationData="mapData" />

      </div>

      <div class="flex items-center justify-center gap-x-6 mt-12 md:mt-19 pb-24">
        <Button color="white" @click="goBack" v-if="route.params.id">
          <Text path="profile.back" />
        </Button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import useAuth from '../service/auth'
import useUser from '../service/user'

import PhotoUpload from '../components/user/PhotoUpload.vue'
import MapDisplay from '../components/location/MapDisplay.vue'
import LocationEdit from '../components/location/LocationEdit.vue'

const router = useRouter()
const route = useRoute()

const { user: selfUser } = useAuth()
const { getUserById } = useUser()

const userId = ref()
const user = ref<User>()
const isOwn = ref(false)
const loaded = ref(false)

const mapData = ref<LocationData>()
const notFound = ref()
const editLocation = ref(false)
const newLocationSelected = ref(false)

const onLocationSelected = (location: LocationData) => {
  mapData.value = location
  notFound.value = (location === null)
  newLocationSelected.value = true
}

const onLocationSaved = (locationData: LocationData) => {
  editLocation.value = false
  if (user.value) {
    user.value.location = locationData.location
    user.value.country = locationData.country
  }
}

const editClicked = () => {
  editLocation.value = true
  newLocationSelected.value = false
}

const editCancel = () => {
  editLocation.value = false
  if (newLocationSelected.value) {
    initMapData(user.value)
  }
}

const goBack = () => {
  router.go(-1)
}

const photoUrl = () => {
  if (user.value?.photo) {
    return '../static/photos/' + user.value.photo
  } else {
    return '../static/avatar'
  }
}

const onPhotoUploaded = (fileName: string) => {
  selfUser.value.photo = fileName
  if (user.value)
    user.value.photo = fileName
}

const loadUser = async (userId: string) => {
  try {
    user.value = await getUserById(userId)

    initMapData(user.value)

    if (user)
      loaded.value = true
  } catch {

  }
}

const initMapData: any = (user: User) => {
  if (user?.country && user.location) {
    mapData.value = {
      country: user.country,
      location: user.location
    }
  }
}

onBeforeMount(() => {
  const { id } = route.params
  onIdChange(id as string)
})

watch(
  () => route.params.id,
  async newId => {
    onIdChange(newId as string)
  }
)

const onIdChange = async (id: string) => {
  if (id) {
    userId.value = id as string
    if (userId.value === selfUser.value._id) {
      isOwn.value = true
    }
  } else {
    userId.value = selfUser.value._id
    isOwn.value = true
  }

  if (userId.value) {
    loadUser(userId.value)
  }
}
</script>


<style></style>
