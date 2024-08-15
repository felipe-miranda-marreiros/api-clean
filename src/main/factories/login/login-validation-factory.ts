import { EmailValidation } from '@/presentation/helpers/validators/email-validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
import { Validation } from '@/presentation/protocols/validation'
import { EmailValidatorAdapter } from '@/main/adapters/validators/email-validator-adapter'

export function makeLoginValidation(): ValidationComposite {
  const validations: Validation[] = []
  const _ = ['email', 'password'].forEach((field) => validations.push(new RequiredFieldValidation(field)))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
