import { get, post } from './http'

export interface SignupData {
  name:string
  email: string
  password: string
}

export interface SignupResponse {
  user: User
  access_token: string
}

export interface LoginData {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  access_token: string
}

export function signup (data: SignupData) : Promise<SignupResponse> {
  return post<SignupResponse>('auth/signup/', data)
}

export function login (data: LoginData) : Promise<LoginResponse> {
  return post<LoginResponse>('auth/login/', data)
}

export function checkAuth () : Promise<User> {
  return get<User>('auth/check/')
}
