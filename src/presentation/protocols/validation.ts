import { HttpResponse } from './http'

export interface Validation {
  validate<T>(input: T): HttpResponse | null
}

export interface ValidationError {
  errors: unknown[]
}
