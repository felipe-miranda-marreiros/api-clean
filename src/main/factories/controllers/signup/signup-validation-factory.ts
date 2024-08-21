import { Validation } from '@/presentation/protocols/validation'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { CompareFieldsValidation } from '@/validation/validators/compare-fields-validation'
import { EmailValidation } from '@/validation/validators/email-validation'

export function makeSignUpValidation(): ValidationComposite {
  const validations: Validation[] = []

  const _ = ['name', 'email', 'password', 'passwordConfirmation'].forEach((field) =>
    validations.push(new RequiredFieldValidation(field))
  )

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
