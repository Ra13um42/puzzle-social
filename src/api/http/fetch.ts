import { ApiError } from "./error"

let authToken: string | null = null

export function setAuthToken(token: string | null) {
  authToken = token
}

let baseURL = '/api/'

export async function request<T>(url: string, options: RequestInit): Promise<T> {
  try {
    const headers: HeadersInit = {}

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`
    }

    const response = await fetch(baseURL + url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      }
    })

    if (response.ok) {
      const text = await response.text()

      const isJson = response.headers.get("content-type")?.includes("application/json")

      if (isJson) {
        return text ? JSON.parse(text) as T : {} as T
      } else {
        return text as unknown as T
      }

    } else {
      // Api errors
      const data = await response.json()
      throw new ApiError(response.statusText, response.status, data)
    }

  } catch (error: any) {
    if (error instanceof ApiError) {

    } else {
      // Network errors
      console.error(`Network error: ${error.message}`)
    }
    throw error
  }
}
