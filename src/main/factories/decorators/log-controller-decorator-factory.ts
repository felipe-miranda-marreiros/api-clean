import { LogMongoRepository } from '@/infra'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { Controller } from '@/presentation/protocols'

export function makeLogControllerDecorator(controller: Controller): Controller {
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logErrorRepository)
}
