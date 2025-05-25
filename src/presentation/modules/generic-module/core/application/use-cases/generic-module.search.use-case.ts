import {
  IGenericModuleRepository,
  ISearchGenericModuleUseCase,
  SearchGenericModuleInput,
  SearchGenericModuleOutput,
} from '../../domain'
import { ErrorFactory } from '../errors/error.factory'

export class SearchGenericModuleUseCase implements ISearchGenericModuleUseCase {
  constructor(
    private readonly genericModuleRepository: IGenericModuleRepository
  ) {}

  async search(
    args: SearchGenericModuleInput
  ): Promise<SearchGenericModuleOutput> {
    try {
      return this.genericModuleRepository.search(args)
    } catch (error) {
      throw ErrorFactory.genericError('Failed to search genericModules', {
        originalError: error as Error,
      })
    }
  }
}
