import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidParamError } from '@/presentation/errors'

function makeSut(): CompareFieldsValidation {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}

describe('CompareField Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_name', fieldToCompare: 'wrong_value' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })
  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_name', fieldToCompare: 'any_name' })
    expect(error).toBeFalsy()
  })
})
