import { GenericModule } from '../../entities/generic-module.entity'

export interface IGetGenericModuleUseCase {
  get(itemId: string): Promise<GenericModule | null>
}
