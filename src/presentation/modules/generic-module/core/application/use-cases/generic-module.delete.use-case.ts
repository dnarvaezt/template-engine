import {
  IDeleteGenericModuleUseCase,
  IGenericModuleRepository,
} from '../../domain'
import { ErrorFactory } from '../errors/error.factory'

export class DeleteGenericModuleUseCase implements IDeleteGenericModuleUseCase {
  constructor(private readonly repository: IGenericModuleRepository) {}

  async delete(genericModuleId: string): Promise<void> {
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
