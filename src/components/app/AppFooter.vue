<template>

  <div>
    <ul class="flex flex-col md:flex-row md:space-x-7 py-2.5">
      <li class="font-medium">
        <Text path="app.footer.copyright" />
      </li>
      <li>
        <RouterLink to="/terms" class="text-gray-800 hover:text-blue-800">
          <Text path="app.footer.terms" />
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/privacy" class="text-gray-800 hover:text-blue-800">
          <Text path="app.footer.privacy" />
        </RouterLink>
      </li>
    </ul>
  </div>

</template>


<script setup lang="ts">

</script>
