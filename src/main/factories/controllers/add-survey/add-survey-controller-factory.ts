import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDBAddSurvey } from '../../usecases/add-survey/db-add-survey-factory'
import { Controller } from '@/presentation/protocols'
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'

export function makeAddSurveyController(): Controller {
  return makeLogControllerDecorator(new AddSurveyController(makeAddSurveyValidation(), makeDBAddSurvey()))
}
