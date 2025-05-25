import {
  GenericModule,
  GenericModuleRepository,
  GenericModuleValidator,
  UpdateGenericModuleInput,
  UpdateGenericModuleUseCase,
} from '../domain'
import { ErrorFactory } from '../domain/errors/error.factory'

export class UpdateGenericModuleService implements UpdateGenericModuleUseCase {
  constructor(private readonly repository: GenericModuleRepository) {}

  async execute(input: UpdateGenericModuleInput): Promise<GenericModule> {
    this.validateInput(input)

    const existingModule = await this.repository.getById(input.id)
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
