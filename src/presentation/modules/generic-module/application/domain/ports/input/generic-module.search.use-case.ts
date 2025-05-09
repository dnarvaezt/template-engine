import { GenericModule } from '../../entities/generic-module.entity'

export interface SearchGenericModuleInput extends Partial<GenericModule> {}

export interface SearchGenericModuleOutput {
  data: GenericModule[]
}

export interface SearchGenericModuleUseCase {
  execute(args: SearchGenericModuleInput): Promise<SearchGenericModuleOutput>
}
