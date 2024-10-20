import { get, post, put, del } from './http'

export interface UpdateLocationDto {
  location: Location
  country: Country
}

export function fetchUsers () : Promise<Array<User>> {
  return get<Array<User>>('users/')
}

export function fetchUser (userId: string) : Promise<User> {
  return get<User>('users/' + userId)
}

export function updateName (name: string) : Promise<void> {
  return put('users/me/name', { name: name})
}

export function fetchCount (): Promise<number> {
  return get('users/count')
}

export function updatePhoto (imageData: any): Promise<void> {
  return post('users/me/photo', imageData)
}

export function updateLocation (locationData: UpdateLocationDto): Promise<void> {
  return put('users/me/location', locationData)
}

export function deleteUser (): Promise<void> {
  return del('users/me/')
}
