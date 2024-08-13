import { Validation } from '../../protocols/validation'
import { EmailValidator } from '@/presentation/protocols/email-validator'
import { InvalidParamError } from '@/presentation/errors'

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate<T>(input: T): Error | null {
    const isValid = this.emailValidator.isValid(input[this.fieldName as keyof T])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
