import { GenericModule } from '../../entities/generic-module.entity'

export interface UpdateGenericModuleInput extends Partial<GenericModule> {
  id: string
}

export interface UpdateGenericModuleOutput extends GenericModule {}

export interface UpdateGenericModuleUseCase {
  execute(item: UpdateGenericModuleInput): Promise<UpdateGenericModuleOutput>
}
