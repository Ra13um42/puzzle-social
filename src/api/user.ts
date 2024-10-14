import axios from 'axios';

export interface UpdateLocationDto {
  location: Location
  country: Country
}

export function fetchUsers () : Promise<Array<User>> {
  return axios.get<Array<User>>('users/')
    .then(response  => response.data)
}

export function fetchUser (userId: string) : Promise<User> {
  return axios.get<User>('users/' + userId)
    .then(response  => response.data)
}

export function updateName (name: string) : Promise<void> {
  return axios.put('users/me/name', { name: name})
    .then(response  => response.data)
}

export function fetchCount (): Promise<number> {
  return axios.get('users/count').then(response => response.data)
}

export function updatePhoto (imageData: any): Promise<void> {
  return axios.post('users/me/photo', imageData).then(response => response.data)
}

export function updateLocation (locationData: UpdateLocationDto): Promise<void> {
  return axios.put('users/me/location', locationData).then(response => response.data)
}

export function deleteUser (): Promise<void> {
  return axios.delete('users/me/').then(response => response.data)
}
