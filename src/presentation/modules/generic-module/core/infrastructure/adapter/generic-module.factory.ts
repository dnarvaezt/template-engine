import {
  CreateGenericModuleUseCase,
  DeleteGenericModuleUseCase,
  GetGenericModuleUseCase,
  SearchGenericModuleUseCase,
  UpdateGenericModuleUseCase,
} from '../../application'
import { IGenericModuleRepository } from '../../domain'
import { GenericModuleAdapter } from './generic-module.adapter'

export class GenericModuleServiceFactory {
  static create(repository: IGenericModuleRepository): GenericModuleAdapter {
    const createGenericModuleService = new CreateGenericModuleUseCase(
      repository
    )
    const updateGenericModuleService = new UpdateGenericModuleUseCase(
      repository
    )
    const deleteGenericModuleService = new DeleteGenericModuleUseCase(
      repository
    )
    const getGenericModuleService = new GetGenericModuleUseCase(repository)
    const searchGenericModuleService = new SearchGenericModuleUseCase(
      repository
    )

    return new GenericModuleAdapter(
      createGenericModuleService,
      updateGenericModuleService,
      deleteGenericModuleService,
      getGenericModuleService,
      searchGenericModuleService
    )
  }
}
