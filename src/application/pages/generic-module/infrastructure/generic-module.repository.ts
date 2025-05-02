import { Repository, WebRepository } from 'src/infrastructure'
import { GenericModuleModel } from './generic-module.model'

export abstract class GenericModuleRepository extends Repository<GenericModuleModel> {}

export class GenericModuleWebRepository
  extends WebRepository<GenericModuleModel>
  implements GenericModuleRepository
{
  constructor() {
    super('items')
  }
}
