import { IGenericModuleRepository } from '../domain'
import { GenericModuleServiceFactory } from './adapter/generic-module.factory'
import { InMemoryGenericModuleRepository } from './repository'

export const genericModuleRepository: IGenericModuleRepository =
  GenericModuleServiceFactory.create(new InMemoryGenericModuleRepository())
