<template>
  <label class="block w-32 mt-9 py-2 px-4 bg-gray-100 cursor-pointer text-center rounded-md ">
    <input id="file-input" ref="fileInput" class="hidden" type="file" @change="imageSelected($event)" />
    Bild ändern
  </label>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios';

let previewImageSrc = ref(null)

let image = ref()
let fileInput = ref(null)

const props = defineProps({
  url: String
})

const emit = defineEmits(['uploaded'])

let imageSelected = (event: any) => {
  if (event.target.files.length > 0) {
    image.value = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(image.value)
    reader.onload = e => {
      save()
    }
  }
}

let save = () => {
  const imageFormData = new FormData()
  imageFormData.append('photo', image.value)

  if (props.url) {
    axios.post(props.url, imageFormData).then(response => {
      previewImageSrc.value = null
      emit('uploaded', response.data)
    })
  }
}

</script>
