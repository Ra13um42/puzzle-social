<template>
  {{ text }}
</template>


<script setup lang="ts">
import { computed } from 'vue'
import useLanguage from './../../service/language'

const props = defineProps({
  path: String
})

const { getText } = useLanguage()

let text = computed(() => {
  return props.path ? getText(props.path) : ''
})

</script>
