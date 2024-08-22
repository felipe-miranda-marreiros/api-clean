import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'

jest.mock('@/validation/validators/validation-composite')

describe('AddSurveyValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    const _ = ['question', 'answers'].forEach((field) => validations.push(new RequiredFieldValidation(field)))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
