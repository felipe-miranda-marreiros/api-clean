import { ServerError } from '../errors'
import { HttpResponse } from '../protocols/http'

export const BAD_REQUEST = 400
export const SERVER_ERROR = 500
export const SUCCESS = 200

export function badRequest(error: Error): HttpResponse {
  return {
    statusCode: BAD_REQUEST,
    body: error
  }
}

export function serverError(): HttpResponse {
  return {
    statusCode: SERVER_ERROR,
    body: new ServerError()
  }
}

export function ok<TData>(data: TData): HttpResponse {
  return {
    statusCode: SUCCESS,
    body: data
  }
}
