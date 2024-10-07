import axios from 'axios';

export interface SignupData {
  name:string
  email: string
  password: string
}

export interface SignupAnonymData {
  name:string
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
  return axios.post<SignupResponse>('auth/signup/', data)
    .then(response  => response.data)
}

export function login (data: LoginData) : Promise<LoginResponse> {
  return axios.post<LoginResponse>('auth/login/', data)
    .then(response  => response.data)
}

export function checkAuth () : Promise<User> {
  return axios.get<User>('auth/check/')
    .then(response => response.data)
}
