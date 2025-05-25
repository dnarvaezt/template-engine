import {
  CreateGenericModuleService,
  DeleteGenericModuleService,
  GetGenericModuleService,
  SearchGenericModuleService,
  UpdateGenericModuleService,
} from '../application'
import { GenericModuleRepository } from '../domain'
import { GenericModuleAdapter } from './generic-module.adapter'

export class GenericModuleServiceFactory {
  static create(repository: GenericModuleRepository): GenericModuleAdapter {
    const createGenericModuleService = new CreateGenericModuleService(
      repository
    )
    const updateGenericModuleService = new UpdateGenericModuleService(
      repository
    )
    const deleteGenericModuleService = new DeleteGenericModuleService(
      repository
    )
    const getGenericModuleService = new GetGenericModuleService(repository)
    const searchGenericModuleService = new SearchGenericModuleService(
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
