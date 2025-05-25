import { GenericModule } from '../../entities/generic-module.entity'

export interface SearchGenericModuleInput extends Partial<GenericModule> {}

export interface SearchGenericModuleOutput {
  data: GenericModule[]
}

export interface ISearchGenericModuleUseCase {
  search(args: SearchGenericModuleInput): Promise<SearchGenericModuleOutput>
}
