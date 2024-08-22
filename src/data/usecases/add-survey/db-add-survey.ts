import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { AddSurvey, AddSurveyModel } from '@/domain'

export class DbAddSurvey implements AddSurvey {
  constructor(private readonly addSurveyRepository: AddSurveyRepository) {}

  async add(account: AddSurveyModel): Promise<void> {
    await this.addSurveyRepository.add(account)
  }
}
