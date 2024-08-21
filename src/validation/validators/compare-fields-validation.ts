import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'

export class CompareFieldsValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompare: string
  ) {}

  validate<T>(input: T): Error | null {
    if (input[this.fieldName as keyof T] !== input[this.fieldToCompare as keyof T]) {
      return new InvalidParamError(this.fieldToCompare)
    }
    return null
  }
}
