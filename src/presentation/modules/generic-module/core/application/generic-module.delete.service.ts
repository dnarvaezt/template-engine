import { DeleteGenericModuleUseCase, GenericModuleRepository } from '../domain'
import { ErrorFactory } from '../domain/errors/error.factory'

export class DeleteGenericModuleService implements DeleteGenericModuleUseCase {
  constructor(private readonly repository: GenericModuleRepository) {}

  async execute(genericModuleId: string): Promise<void> {
    if (!genericModuleId) {
      throw ErrorFactory.invalidData({
        message: 'GenericModule ID is required',
      })
    }

    try {
      await this.repository.delete(genericModuleId)
    } catch (error) {
      throw ErrorFactory.genericError('Failed to delete genericModule', {
        originalError: error as Error,
      })
    }
  }
}
