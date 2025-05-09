import { GenericModule } from '../../entities/generic-module.entity'

export interface GetGenericModuleUseCase {
  execute(itemId: string): Promise<GenericModule | null>
}
