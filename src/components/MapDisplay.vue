<template>
  <div v-if="showMap">

    <div class="w-full mt-15 z-4">
      <div class="text-right">
        <button class="cursor-pointer px-4 md:px-5 py-1.5 md:py-2.25 rounded-md text-sm font-semibold hover:bg-gray-100"
          :class="{ 'bg-gray-100': zoom === (i) }" v-for="i in range(2, 14)" :key="i" @click="setZoom(i)">
          {{ i }}
        </button>
      </div>

      <div id="map" class="block h-100 md:h-150 w-full mt-1.5 border-2 border-gray-400"></div>

      <div class="mt-1.5 text-gray-700">
        <div v-if="isMobile()">
          <Text path="profile.location.enable_panning_hint" v-if="!panEnabled" />
          <Text path="profile.location.disable_panning_hint" v-else />
        </div>
        <div v-else>
          <Text path="profile.location.enable_zooming_hint" v-if="!zoomEnabled" />
          <Text path="profile.location.disable_zooming_hint" v-else />
        </div>
      </div>
    </div>

  </div>

</template>


<script setup lang="ts">
import { watch, ref, nextTick } from 'vue';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import isMobile from 'is-mobile';

const props = defineProps<{ locationData: LocationData | undefined }>()

let map: any = null
let showMap = ref(false)
let panEnabled = ref(false)
let zoomEnabled = ref(false)
let zoom = ref(12)

watch(() => props.locationData, async (locationData) => {
  removeMap()
  if (locationData) {
    showMap.value = true
    await nextTick()
    createMap(locationData.location)
  }
})

const createMap = async (location: OsmLocation) => {

  // create map and go to location
  map = L.map('map').setView(getCoordinates(location), 12)

  zoom.value = 12

  // add copyright
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  // set style for the polygons
  const polygonStyle = () => {
    return {
      color: 'blue',
      weight: 2,
      fillColor: 'blue',
      fillOpacity: 0.15
    }
  }

  //draw the polygons
  var poly = L.geoJson(location.geojson, { style: polygonStyle }
  ).addTo(map)

  // focus map on polygon boundaries
  if (poly) {
    await fitBounds(poly.getBounds())
  }

  // make polygon transparent when zooming in
  map.on('zoomend', function () {
    var currentZoom = map.getZoom();
    zoom.value = currentZoom
    if (currentZoom >= 15) {
      poly.setStyle({ fillOpacity: 0 });
    } else if (currentZoom >= 14) {
      poly.setStyle({ fillOpacity: 0.03 });
    } else if (currentZoom >= 13) {
      poly.setStyle({ fillOpacity: 0.08 });
    } else {
      poly.setStyle({ fillOpacity: 0.15 });
    }
  });

  // prevent unintentional dragging on mobile
  if (isMobile()) {
    map.dragging.disable();

    map.on('click', function (e: any) {
      togglePanning()
    });
    map.on('zoomend', function (e: any) {
      panEnabled.value = true
      map.dragging.enable();
    });
  } else {
    // prevent unintentional zooming on desktop
    map.scrollWheelZoom.disable();

    map.on('click', function (e: any) {
      toggleZooming()
    });
    map.on('move', function (e: any) {
      zoomEnabled.value = true
      map.scrollWheelZoom.enable();
    });

  }
}

async function fitBounds(bounds: any) {
  return new Promise<void>((resolve) => {
    map.fitBounds(bounds, {
      padding: [20, 20],
      maxZoom: 14,
    })
    map.once('moveend', () => {
      zoom.value = map.getZoom()
      resolve();
    });
  });
}

function togglePanning() {
  if (panEnabled.value) {
    map.dragging.disable();
  } else {
    map.dragging.enable();
  }
  panEnabled.value = !panEnabled.value;
}

function toggleZooming() {
  if (zoomEnabled.value) {
    map.scrollWheelZoom.disable();
  } else {
    map.scrollWheelZoom.enable();
  }
  zoomEnabled.value = !zoomEnabled.value;
}

const getCoordinates = (location: any): any => {
  return [Number(location.lat), Number(location.lon)]
}

const setZoom = (value: number) => {
  map.setZoom(value)
  let old_value = zoom.value
  zoom.value = value
  if (value > old_value) {
    setTimeout(() => {
      map.setView([Number(props.locationData?.location.lat), Number(props.locationData?.location.lon)])
    }, 300)
  }
}

const removeMap = () => {
  if (map) {
    map.remove()
    map = null
    showMap.value = false
  }
}

const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

</script>
