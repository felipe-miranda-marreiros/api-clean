import { makeLoginValidation } from './login-validation'
import { EmailValidation } from '@/presentation/helpers/validators/email-validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
import { EmailValidator } from '@/presentation/protocols/email-validator'
import { Validation } from '@/presentation/protocols/validation'

jest.mock('@/presentation/helpers/validators/validation-composite')

function makeEmailValidator(): EmailValidator {
  class EmailValidatorStub implements EmailValidator {
    isValid<T>(_: T): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    const _ = ['email', 'password'].forEach((field) => validations.push(new RequiredFieldValidation(field)))
    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
