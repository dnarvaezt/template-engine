import { GenericModule } from '../../entities/generic-module.entity'

export interface CreateGenericModuleInput {
  name: string
}

export interface CreateGenericModuleOutput extends GenericModule {}

export interface ICreateGenericModuleUseCase {
  create(item: CreateGenericModuleInput): Promise<CreateGenericModuleOutput>
}
