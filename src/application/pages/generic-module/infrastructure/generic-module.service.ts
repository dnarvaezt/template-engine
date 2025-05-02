import { GenericModuleModel } from './generic-module.model'
import { GenericModuleRepository } from './generic-module.repository'

export class GenericModuleService {
  constructor(private readonly repository: GenericModuleRepository) {}

  async search(): Promise<GenericModuleModel[]> {
    return this.repository.search()
  }

  async get(id: string): Promise<GenericModuleModel | null> {
    return this.repository.get(id)
  }

  async set(genericModule: GenericModuleModel): Promise<GenericModuleModel> {
    return this.repository.set(genericModule)
  }

  async update(genericModule: GenericModuleModel): Promise<GenericModuleModel> {
    return this.repository.update(genericModule)
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}
