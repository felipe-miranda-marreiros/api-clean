import { ServerError, UnAuthorizedError } from '../../errors'
import { HttpResponse } from '../../protocols/http'

export const BAD_REQUEST = 400
export const SERVER_ERROR = 500
export const SUCCESS = 200
export const UNAUTHORIZED = 401
export const FORBBIDEN = 403

export function unauthorized(): HttpResponse {
  return {
    statusCode: UNAUTHORIZED,
    body: new UnAuthorizedError()
  }
}

export function forbbiden(error: Error): HttpResponse {
  return {
    statusCode: FORBBIDEN,
    body: error
  }
}

export function badRequest(error: Error): HttpResponse {
  return {
    statusCode: BAD_REQUEST,
    body: error
  }
}

export function serverError(error?: Error): HttpResponse {
  return {
    statusCode: SERVER_ERROR,
    body: new ServerError(error?.stack as string)
  }
}

export function ok<TData>(data: TData): HttpResponse {
  return {
    statusCode: SUCCESS,
    body: data
  }
}
