import {
  CreateGenericModuleInput,
  CreateGenericModuleOutput,
  CreateGenericModuleUseCase,
  GenericModuleRepository,
  GenericModuleValidator,
} from '../domain'
import { ErrorFactory } from '../domain/errors/error.factory'

export class CreateGenericModuleService implements CreateGenericModuleUseCase {
  constructor(private readonly repository: GenericModuleRepository) {}

  async execute(
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
