import { request } from "./fetch"
export { setAuthToken } from "./fetch"
export { ApiError } from "./error"


export function get<T>(url: string): Promise<T> {
  return request<T>(url, { method: 'GET' })
}
  
export function post<T>(url: string, body: any): Promise<T> {
  return request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json'}
  })
}

export function put<T>(url: string, body: any): Promise<T> {
  return request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json'}
  })
}

export function del<T>(url: string): Promise<T> {
  return request<T>(url, { method: 'DELETE' })
}

export function postFormData<T>(url: string, body: any): Promise<T> {
  return request<T>(url, {
      method: 'POST',
      body: body,
  })
}
