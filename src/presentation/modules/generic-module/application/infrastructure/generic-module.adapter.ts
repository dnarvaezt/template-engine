import {
  CreateGenericModuleInput,
  CreateGenericModuleOutput,
  CreateGenericModuleUseCase,
  DeleteGenericModuleUseCase,
  GenericModule,
  GenericModuleRepository,
  GetGenericModuleUseCase,
  SearchGenericModuleInput,
  SearchGenericModuleOutput,
  SearchGenericModuleUseCase,
  UpdateGenericModuleUseCase,
} from '../domain'

export class GenericModuleAdapter implements GenericModuleRepository {
  constructor(
    private readonly createGenericModuleService: CreateGenericModuleUseCase,
    private readonly updateGenericModuleService: UpdateGenericModuleUseCase,
    private readonly deleteGenericModuleService: DeleteGenericModuleUseCase,
    private readonly getGenericModuleService: GetGenericModuleUseCase,
    private readonly searchGenericModuleService: SearchGenericModuleUseCase
  ) {}

  async create(
    item: CreateGenericModuleInput
  ): Promise<CreateGenericModuleOutput> {
    return this.createGenericModuleService.execute(item)
  }

  async update(item: GenericModule): Promise<GenericModule> {
    return this.updateGenericModuleService.execute(item)
  }

  async delete(itemId: string): Promise<void> {
    return this.deleteGenericModuleService.execute(itemId)
  }

  async getById(itemId: string): Promise<GenericModule | null> {
    return this.getGenericModuleService.execute(itemId)
  }

  async search(
    args: SearchGenericModuleInput
  ): Promise<SearchGenericModuleOutput> {
    return this.searchGenericModuleService.execute(args)
  }
}
