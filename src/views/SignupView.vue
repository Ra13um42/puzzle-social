<template>
  <div class="mx-auto py-14 lg:py-34 text-center">
    <component :is="stepComponent"></component>
    <div class="h-20"></div>
  </div>
</template>


<script setup lang="ts">
import { onBeforeMount } from 'vue';
import useSignup from '../service/signup'

const { stepComponent, reset } = useSignup()

onBeforeMount(() => {
  reset()
})
</script>


<style></style>
