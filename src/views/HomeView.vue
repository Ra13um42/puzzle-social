<template>
  <div>

    <AppLogo />

    <div class="flex items-center justify-center gap-x-2 mt-11 md:mt-13" v-if="!loggedin">

      <Button color="red" to="/signup" class="!px-8">
        <Text path="app.start" />
      </Button>

      <Button color="transparent" to="/login" class="!px-7">
        <Text path="app.login" />
      </Button>

    </div>

    <div class="flex items-center justify-center mt-11 md:mt-10 gap-x-6" v-if="loggedin">
      <Button color="indigo" to="/user" class="!px-6.5">
        <Text path="app.your_profile" />
      </Button>
    </div>

    <UsersDisplay />

  </div>
</template>


<script setup lang="ts">
import useAuth from '../service/auth'
import AppLogo from '../components/AppLogo.vue'
import UsersDisplay from '../components/UsersDisplay.vue'

const { loggedin } = useAuth()

</script>
