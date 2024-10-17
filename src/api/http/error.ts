export class ApiError extends Error {
    public statusCode?: number
    public data?: any
    public message: any
  
    constructor(statusText: string, statusCode?: number, data?: any) {
      super(statusText)
      this.statusCode = statusCode
      this.data = data
      
      this.message = Array.isArray(data.message) ? data.message[0] : data.message
    }
  }
  