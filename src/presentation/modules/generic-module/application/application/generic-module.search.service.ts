import {
  GenericModuleRepository,
  SearchGenericModuleInput,
  SearchGenericModuleOutput,
  SearchGenericModuleUseCase,
} from '../domain'
import { ErrorFactory } from '../domain/errors/error.factory'

export class SearchGenericModuleService implements SearchGenericModuleUseCase {
  constructor(
    private readonly genericModuleRepository: GenericModuleRepository
  ) {}

  async execute(
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
