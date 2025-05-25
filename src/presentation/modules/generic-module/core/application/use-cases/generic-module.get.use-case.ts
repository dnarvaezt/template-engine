import {
  GenericModule,
  IGenericModuleRepository,
  IGetGenericModuleUseCase,
} from '../../domain'
import { ErrorFactory } from '../errors/error.factory'

export class GetGenericModuleUseCase implements IGetGenericModuleUseCase {
  constructor(
    private readonly genericModuleRepository: IGenericModuleRepository
  ) {}

  async get(genericModuleId: string): Promise<GenericModule | null> {
    if (!genericModuleId) {
      throw ErrorFactory.invalidData({
        message: 'GenericModule ID is required',
      })
    }

    try {
      return await this.genericModuleRepository.get(genericModuleId)
    } catch (error) {
      throw ErrorFactory.genericError('Failed to get genericModule', {
        originalError: error as Error,
      })
    }
  }
}
