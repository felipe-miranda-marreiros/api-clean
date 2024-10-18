import { z } from 'zod'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDBAddSurvey } from '../../usecases/add-survey/db-add-survey-factory'
import { Controller } from '@/presentation/protocols'
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'
import { AddSurveyModel } from '@/domain'
import { ZodAdapter } from '@/validation/adapters/zodAdapter'

export function makeAddSurveyController(): Controller {
  return makeLogControllerDecorator(
    new AddSurveyController(
      new ZodAdapter(
        z.object({
          question: z.string(),
          answers: z.array(
            z.object({
              image: z.string().optional(),
              answer: z.string()
            })
          )
        }) satisfies z.ZodSchema<AddSurveyModel>
      ),
      makeDBAddSurvey()
    )
  )
}
