<template>
  <div id="map" class="inline-block h-100 md:h-150 w-full mt-15 z-4 border-2 border-gray-400" v-if="showMap"></div>

  <div class="mt-1.5 text-gray-700" v-if="showMap">
    <div v-if="isMobile()">
      <Text path="profile.location.enable_panning_hint" v-if="!panEnabled" />
      <Text path="profile.location.disable_panning_hint" v-else />
    </div>
    <div v-else>
      <Text path="profile.location.enable_zooming_hint" v-if="!zoomEnabled" />
      <Text path="profile.location.disable_zooming_hint" v-else />
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
    await fitBounds(poly.getBounds())
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

const removeMap = () => {
  if (map) {
    map.remove()
    map = null
    showMap.value = false
  }
}

</script>
