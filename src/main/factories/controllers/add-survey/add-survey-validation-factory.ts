import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'

export function makeAddSurveyValidation(): ValidationComposite {
  const validations: Validation[] = []
  const _ = ['question', 'answers'].forEach((field) => validations.push(new RequiredFieldValidation(field)))
  return new ValidationComposite(validations)
}
