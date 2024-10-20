<template>
  <div>
    <div id="dropdown" class="relative w-full md:w-60 mt-7">
      <button id="dropdown-button" @click.stop="toggleDropdown"
        class="inline-flex justify-between w-full px-4 py-2.25 text-sm text-gray-700 border-1 border-gray-200 rounded-md shadow-sm focus:outline-none">
        <span class="mr-2 text-[1rem]">{{ dropdownValue }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-2 -mr-2 float-right" viewBox="0 0 20 20"
          fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clip-rule="evenodd" />
        </svg>
      </button>

      <div id="dropdown_list"
        class="absolute hidden left-0 mt-2 h-auto max-h-100 min-h-30 overflow-y-scroll rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 z-7"
        :class="{ '!block': isOpen }" ref="dropdown_list" @click.stop>

        <input id="filter_input"
          class="block w-full px-4 py-1.75 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
          type="text" :placeholder="text('profile.location.country_filter')" autocomplete="off" v-model="filter"
          ref="filter_input">

        <span v-for="(option) in filteredCountries"
          class="block px-4 py-1.5 text-left text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
          @click="onContrySelected(option)">
          {{ option.native }}
        </span>
      </div>
    </div>

    <div class="mt-4" v-if="selectedCountry">
      <input type="text" :placeholder="text('profile.location.insert_city')" v-model="cityQuery" id="city_input"
        ref="city_input"
        class="px-3 py-[0.45rem] md:py-1.5 border-1 shadow-sm border-gray-200 outline-none rounded-md text-md w-full md:w-60 text-black placeholder-text-md placeholder-text-gray-400"
        @keydown.enter="citySearch">

      <Button color="white" @click="citySearch" class="!px-6 !py-2.25 ml-0 md:ml-5 mt-5 md:mt-0">
        <Text path="profile.location.search" />
      </Button>

      <Button color="indigo" @click="saveClicked" class="!px-6 !py-2.25 ml-4 md:ml-5" v-if="location_result">
        <Text path="profile.location.save" />
      </Button>

    </div>

  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted, useTemplateRef, nextTick } from 'vue'
import useUser from '../../service/user'
import useLanguage from '../../service/language'
import { countries } from 'countries-list'

const emit = defineEmits(['locationSelected', 'locationSaved'])

const props = defineProps<{ locationData: LocationData | undefined }>()

const { saveLocation } = useUser()
const { text } = useLanguage()

const countryArray = Object.entries(countries).map(([code, details]) => ({
  code,
  ...details
}))

const selectedCountry = ref<Country>()
const cityQuery = ref('')
const location_result = ref<Location>()

const dropdown_list = useTemplateRef('dropdown_list')
const filter_input = useTemplateRef('filter_input')
const city_input = useTemplateRef('city_input')

let isOpen = ref(false)
let filter = ref('')


const dropdownValue = computed(() => {
  return selectedCountry.value ? selectedCountry.value.native : text('profile.location.select_country')
})

const filteredCountries = computed(() => {
  return countryArray.filter(country => {
    if (filter.value) {
      return country.name.toLowerCase().startsWith(filter.value.toLowerCase()) || country.native.toLowerCase().startsWith(filter.value.toLowerCase())
    }
    return true
  })
})

const onContrySelected = (country: any) => {
  selectedCountry.value = country
  isOpen.value = false
}

async function toggleDropdown() {
  isOpen.value = !isOpen.value
  filter.value = ''
  await nextTick()
  if (filter_input.value) {
    filter_input.value.focus()
  }
}

const citySearch = () => {
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${cityQuery.value}&countrycodes=${selectedCountry.value?.code}&polygon_geojson=1&limit=1`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        location_result.value = data[0]

        let locationData = {
          location: location_result.value,
          country: selectedCountry.value
        }

        emit('locationSelected', locationData)
      } else {
        emit('locationSelected', null)
      }
    })
}

function closeDropdown() {
  isOpen.value = false
}

const saveClicked = async () => {
  if (location_result.value && selectedCountry.value) {

    let locationData = {
      location: location_result.value,
      country: selectedCountry.value
    }

    await saveLocation(locationData)

    emit('locationSaved', locationData)
  }
}

onMounted(async () => {
  loadCountry()

  if (selectedCountry.value) {
    await nextTick()

    if (city_input.value) {
      city_input.value.focus()
    }
  }

  document.addEventListener('click', closeDropdown)
})

const loadCountry = () => {
  if (props.locationData && props.locationData.country) {

    let country_code = props.locationData.country.code

    if (country_code) {
      let country = countryArray.find(country => {
        return country.code === country_code
      })
      selectedCountry.value = country
    }
  }
}

</script>
