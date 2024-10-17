<template>
  <div class="flex">
    <label class="block mt-9 py-2 px-4 bg-gray-100 cursor-pointer text-center rounded-md">
      <input id="file-input" ref="fileInput" class="hidden" type="file" @change="imageSelected($event)" />
      <Text path="profile.change_image" />
    </label>
    <span class="block mt-4" v-if="message">{{ message }}</span>
  </div>

</template>


<script setup lang="ts">
import { ref } from 'vue'
import { postFormData } from '../api/http';

let previewImageSrc = ref(null)

let image = ref()
let fileInput = ref(null)
let message = ref('')

const props = defineProps({
  url: String
})

const emit = defineEmits(['uploaded'])

let imageSelected = (event: any) => {
  message.value = ''

  if (event.target.files.length > 0) {
    const file = event.target.files[0]

    if (file.size / 1000000 > 2) {
      message.value = 'Bild zu groß. (maximal 2mb)'
    } else {
      image.value = file
      const reader = new FileReader()
      reader.readAsDataURL(image.value)
      reader.onload = e => {
        save()
      }
    }

  }
}

let save = () => {
  const imageFormData = new FormData()
  imageFormData.append('photo', image.value)

  if (props.url) {
    postFormData<string>(props.url, imageFormData).then(response => {
      previewImageSrc.value = null
      emit('uploaded', response)
    })
  }
}

</script>
