import { GenericModuleRepository } from '../domain'
import { GenericModuleServiceFactory } from './generic-module.factory'
import { InMemoryGenericModuleRepository } from './repository'

export const genericModuleRepository: GenericModuleRepository =
  GenericModuleServiceFactory.create(new InMemoryGenericModuleRepository())
