import { ZodSchema } from 'zod'
import { Validation } from '@/presentation/protocols/validation'
import { badRequest } from '@/presentation'
import { HttpResponse } from '@/presentation/protocols'

export class ZodAdapter implements Validation {
  constructor(private readonly schema: ZodSchema) {}

  validate<T>(input: T): HttpResponse | null {
    const result = this.schema.safeParse(input)
    if (!result.success) {
      return badRequest({
        errors: result.error.errors
      })
    }
    return null
  }
}
