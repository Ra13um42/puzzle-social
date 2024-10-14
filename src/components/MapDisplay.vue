<template>
  <div id="map" class="inline-block h-100 md:h-150 w-full mt-15 z-4 border-2 border-gray-400" v-if="showMap"></div>
</template>


<script setup lang="ts">
import { watch, ref, nextTick } from 'vue';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';

const props = defineProps<{ locationData: LocationData | undefined }>()

let map: any = null
let showMap = ref(false)

watch(() => props.locationData, async (locationData) => {
  removeMap()
  if (locationData) {
    showMap.value = true
    await nextTick()
    createMap(locationData.location)
  }
})

const createMap = (location: OsmLocation) => {

  // create map and go to location
  map = L.map('map').setView([Number(location.lat), Number(location.lon)], 12)

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
    map.fitBounds(poly.getBounds(), {
      padding: [20, 20],
      maxZoom: 14,
    })
  }

  // make polygon transparent when zooming in
  map.on('zoomend', function () {
    var currentZoom = map.getZoom();

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
}

const removeMap = () => {
  if (map) {
    map.remove()
    map = null
    showMap.value = false
  }
}

</script>
