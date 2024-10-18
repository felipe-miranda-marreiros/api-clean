import { ServerError, UnAuthorizedError } from '../../errors'
import { HttpResponse } from '../../protocols/http'
import { ValidationError } from '@/presentation/protocols/validation'

export const BAD_REQUEST = 400
export const SERVER_ERROR = 500
export const SUCCESS = 200
export const UNAUTHORIZED = 401
export const FORBBIDEN = 403
export const NO_CONTENT = 403

export function unauthorized(): HttpResponse {
  return {
    statusCode: UNAUTHORIZED,
    body: new UnAuthorizedError()
  }
}

export function noContent(): HttpResponse {
  return {
    statusCode: NO_CONTENT,
    body: null
  }
}

export function forbbiden(error: Error): HttpResponse {
  return {
    statusCode: FORBBIDEN,
    body: error
  }
}

export function badRequest(error: ValidationError): HttpResponse {
  return {
    statusCode: BAD_REQUEST,
    body: error.errors
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
