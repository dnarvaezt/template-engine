import { ErrorFactory } from '../../application/errors/error.factory'
import { GenericModuleValidator } from '../../application/validators'
import {
  CreateGenericModuleInput,
  CreateGenericModuleOutput,
  GenericModule,
  IGenericModuleRepository,
  SearchGenericModuleInput,
  SearchGenericModuleOutput,
} from '../../domain'

export class InMemoryGenericModuleRepository
  implements IGenericModuleRepository
{
  private modules: GenericModule[] = []

  async create(
    input: CreateGenericModuleInput
  ): Promise<CreateGenericModuleOutput> {
    this.validateInput(input)

    const newModule = new GenericModule({
      ...input,
      id: this.generateId(),
    })

    this.modules.push(newModule)
    return newModule
  }

  async update(module: GenericModule): Promise<GenericModule> {
    const index = this.findModuleIndexById(module.id)
    this.validateInput(module)

    this.modules[index] = { ...this.modules[index], ...module }
    return this.modules[index]
  }

  async delete(moduleId: string): Promise<void> {
    const index = this.findModuleIndexById(moduleId)
    this.modules.splice(index, 1)
  }

  async get(moduleId: string): Promise<GenericModule | null> {
    if (!moduleId) {
      throw ErrorFactory.invalidData({ message: 'Module ID is required' })
    }
    return this.modules.find((module) => module.id === moduleId) || null
  }

  async search(
    criteria: SearchGenericModuleInput
  ): Promise<SearchGenericModuleOutput> {
    return { data: this.modules }
  }

  // Private helper methods
  private validateInput(input: Partial<GenericModule>): void {
    try {
      GenericModuleValidator.validate(input)
    } catch (error) {
      throw ErrorFactory.invalidData({
        message: error instanceof Error ? error.message : 'Validation failed',
      })
    }
  }

  private findModuleIndexById(moduleId: string): number {
    const index = this.modules.findIndex((module) => module.id === moduleId)
    if (index === -1) {
      throw ErrorFactory.notFound({ id: moduleId })
    }
    return index
  }

  private generateId(): string {
    return (this.modules.length + 1).toString()
  }
}
