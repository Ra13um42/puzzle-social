<template>
  <template v-if="props.to">
    <RouterLink :to="props.to" :class="`${buttonClasses} ${$attrs.class}`" @click="handleClick">
      <slot />
    </RouterLink>
  </template>
  <template v-else>
    <button :class="`${buttonClasses} ${$attrs.class}}`" @click="handleClick">
      <slot />
    </button>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

interface Props {
  color?: string
  size?: 'small' | 'large'
  to?: string // Add `to` prop for router-link functionality
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'click'): void }>()

// Compute classes based on color and size
const buttonClasses = computed(() => {
  const baseClasses = 'text-white font-medium focus:outline-none rounded-xl'
  const sizeClasses = props.size === 'small' ? 'px-4.5 py-2 text-sm' : 'px-8 py-2.5 text-sm'

  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    red: 'bg-red-700 hover:bg-red-600 dark:bg-red-800 dark:hover:bg-red-700',
    white: 'bg-white dark:bg-black !text-gray-800 !dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 shadow-sm shadow-gray-300 dark:shadow-black',
    indigo: 'bg-indigo-700 hover:bg-indigo-600 dark:bg-indigo-800 dark:hover:bg-indigo-700',
    transparent: '!text-gray-800 !dark:text-gray-300',
  }[props.color || 'blue']

  return `${baseClasses} ${sizeClasses} ${colorClasses}`
})

const handleClick = () => {
  if (!props.to) {
    emit('click')
  }
}

</script>

<style scoped></style>