declare interface OsmLocation {
  name: string
  display_name: string
  lat: string
  lon: string
  boundingbox: Array<string>
  geojson: any
  osm_id: number
  osm_type: string
}