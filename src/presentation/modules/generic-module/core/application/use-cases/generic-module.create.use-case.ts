import {
  CreateGenericModuleInput,
  CreateGenericModuleOutput,
  ICreateGenericModuleUseCase,
  IGenericModuleRepository,
} from '../../domain'
import { ErrorFactory } from '../errors'
import { GenericModuleValidator } from '../validators'

export class CreateGenericModuleUseCase implements ICreateGenericModuleUseCase {
  constructor(private readonly repository: IGenericModuleRepository) {}

  async create(
    input: CreateGenericModuleInput
  ): Promise<CreateGenericModuleOutput> {
    try {
      GenericModuleValidator.validate(input)
      const response: CreateGenericModuleOutput =
        await this.repository.create(input)
      return response
    } catch (error) {
      throw ErrorFactory.invalidData({
        message: `Failed to create genericModule: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        originalError: error as Error,
      })
    }
  }
}
