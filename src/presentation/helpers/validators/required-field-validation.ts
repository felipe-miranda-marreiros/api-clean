import { Validation } from '../../protocols/validation'
import { MissingParamError } from '@/presentation/errors'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate<T>(input: T): Error | null {
    if (!input[this.fieldName as keyof T]) {
      return new MissingParamError(this.fieldName)
    }
    return null
  }
}
