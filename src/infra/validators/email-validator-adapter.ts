import validator from 'validator'
import { EmailValidator } from '@/validation/protocols/email-validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid<T>(email: T): boolean {
    return validator.isEmail(email as string)
  }
}
