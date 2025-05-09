import { GenericModule } from '../../entities/generic-module.entity'

export interface CreateGenericModuleInput {
  name: string
  description: string
  price: number
  stock: number
}

export interface CreateGenericModuleOutput extends GenericModule {}

export interface CreateGenericModuleUseCase {
  execute(item: CreateGenericModuleInput): Promise<CreateGenericModuleOutput>
}
