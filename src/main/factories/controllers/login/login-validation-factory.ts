import { Validation } from '@/presentation/protocols/validation'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import { EmailValidation } from '@/validation/validators/email-validation'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'

export function makeLoginValidation(): ValidationComposite {
  const validations: Validation[] = []
  const _ = ['email', 'password'].forEach((field) => validations.push(new RequiredFieldValidation(field)))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
