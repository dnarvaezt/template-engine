import { GenericModule } from '../../entities'
import {
  CreateGenericModuleInput,
  CreateGenericModuleOutput,
  SearchGenericModuleInput,
  SearchGenericModuleOutput,
} from '../input'

export interface GenericModuleRepository {
  create(item: CreateGenericModuleInput): Promise<CreateGenericModuleOutput>
  update(item: GenericModule): Promise<GenericModule>
  delete(itemId: string): Promise<void>
  getById(itemId: string): Promise<GenericModule | null>
  search(args: SearchGenericModuleInput): Promise<SearchGenericModuleOutput>
}
