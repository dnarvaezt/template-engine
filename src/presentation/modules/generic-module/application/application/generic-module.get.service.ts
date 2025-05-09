import {
  GenericModule,
  GenericModuleRepository,
  GetGenericModuleUseCase,
} from '../domain'
import { ErrorFactory } from '../domain/errors/error.factory'

export class GetGenericModuleService implements GetGenericModuleUseCase {
  constructor(
    private readonly genericModuleRepository: GenericModuleRepository
  ) {}

  async execute(genericModuleId: string): Promise<GenericModule | null> {
    if (!genericModuleId) {
      throw ErrorFactory.invalidData({
        message: 'GenericModule ID is required',
      })
    }

    try {
      return await this.genericModuleRepository.getById(genericModuleId)
    } catch (error) {
      throw ErrorFactory.genericError('Failed to get genericModule', {
        originalError: error as Error,
      })
    }
  }
}
