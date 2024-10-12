<template>

  <div class="container mx-auto my-40 max-w-screen-xl">

    <div class="w-full hidden text-left text-[1.5rem] text-gray-600 ">Neu auf Puzzle</div>

    <div class="grid grid-cols-2 gap-4 md:gap-6 md:flex md:flex-wrap mt-7.5 pb-30">
      <RouterLink :to="'/user/' + user._id" class="md:w-34 cursor-pointer text-center" v-for="(user) in users"
        :key="user._id">
        <object class="object-cover w-full md:w-34 rounded-lg" :data="photoUrl(user.photo)" type="image/png">
          <img class="object-cover w-full md:w-34 rounded-lg" :src="'../static/avatar'" alt="" />
        </object>
        <div class="mt-1.3 text-[1.29rem] md:text-[1.23rem]">{{ user.name }}</div>
      </RouterLink>
    </div>

  </div>

</template>


<script setup lang="ts">
import { onBeforeMount } from 'vue'
import useUsers from '../service/user'

const { users, getUsers } = useUsers()

onBeforeMount(async () => {
  await getUsers()
})

const photoUrl = (name: any) => {
  if (name) {
    const url = '../static/photos/' + name
    return url
  } else {
    return '../static/avatar'
  }
}
</script>
