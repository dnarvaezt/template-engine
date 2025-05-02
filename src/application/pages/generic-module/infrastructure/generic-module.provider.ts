import {
  GenericModuleRepository,
  GenericModuleWebRepository,
} from './generic-module.repository'
import { GenericModuleService } from './generic-module.service'

const genericModuleRepository: GenericModuleRepository =
  new GenericModuleWebRepository()

export const genericModuleService = new GenericModuleService(
  genericModuleRepository
)
