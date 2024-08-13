import { ValidationComposite } from './validation-composite'
import { Validation } from '../../protocols/validation'
import { MissingParamError } from '@/presentation/errors'

function makeValidationStub(): Validation {
  class ValidationStub implements Validation {
    validate<T>(_: T): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}

function makeSut(): SutTypes {
  const validationStubs = [makeValidationStub(), makeValidationStub()]
  const sut = new ValidationComposite(validationStubs)

  return {
    sut,
    validationStubs
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    const FIRST_VALIDATION = 0
    jest.spyOn(validationStubs[FIRST_VALIDATION], 'validate').mockImplementationOnce(() => {
      return new MissingParamError('field')
    })
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
  test('Should return the first error ir more than one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    const FIRST_VALIDATION = 0
    const SECOND_VALIDATION = 1
    jest.spyOn(validationStubs[FIRST_VALIDATION], 'validate').mockImplementationOnce(() => {
      return new Error()
    })
    jest.spyOn(validationStubs[SECOND_VALIDATION], 'validate').mockImplementationOnce(() => {
      return new MissingParamError('field')
    })
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error())
  })
  test('Should not return if validation succeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
