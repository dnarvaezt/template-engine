import {
  GenericModule,
  IGenericModuleRepository,
  IUpdateGenericModuleUseCase,
  UpdateGenericModuleInput,
} from '../../domain'
import { ErrorFactory } from '../errors'
import { GenericModuleValidator } from '../validators'

export class UpdateGenericModuleUseCase implements IUpdateGenericModuleUseCase {
  constructor(private readonly repository: IGenericModuleRepository) {}

  async update(input: UpdateGenericModuleInput): Promise<GenericModule> {
    this.validateInput(input)

    const existingModule = await this.repository.get(input.id)
    if (!existingModule) {
      throw ErrorFactory.notFound({ id: input.id })
    }

    const updatedModule = { ...existingModule, ...input }
    return this.repository.update(updatedModule)
  }

  private validateInput(input: Partial<GenericModule>): void {
    try {
      GenericModuleValidator.validate(input)
    } catch (error) {
      throw ErrorFactory.invalidData({
        message: error instanceof Error ? error.message : 'Validation failed',
      })
    }
  }
}
