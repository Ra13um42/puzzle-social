<template>
  <div class="relative min-h-screen h-auto overflow-hidden">

    <header>
      <nav class="px-4 lg:px-6 py-1.5">
        <AppHeader />
      </nav>
    </header>

    <main class="w-full pt-12 px-4 lg:px-6 mx-auto">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in" @before-leave="transitionOut" @enter="transitionIn">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="absolute bottom-0 px-4 lg:px-6 py-1">
      <AppFooter />
    </footer>

  </div>

  <MobileMenu />

  <Modal />

</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { transitionOut, transitionIn } from './modules/transition.module'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import MobileMenu from './components/MobileMenu.vue'
import Modal from './components/Modal.vue'

</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
