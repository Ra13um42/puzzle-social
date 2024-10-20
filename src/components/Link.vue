<template>
  <RouterLink :to="props.to" :class="buttonClasses">
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'small' | 'large'
  to: string
}

const props = defineProps<Props>()

const buttonClasses = computed(() => {
  const baseClasses = ' font-medium focus:outline-none rounded-xl'
  const sizeClasses = props.size === 'small' ? 'text-xs' : 'text-md'
  return `${baseClasses} ${sizeClasses}`
})
</script>

<style scoped></style>