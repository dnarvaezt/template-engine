import {
  CreateGenericModuleInput,
  CreateGenericModuleOutput,
  GenericModule,
  ICreateGenericModuleUseCase,
  IDeleteGenericModuleUseCase,
  IGenericModuleRepository,
  IGetGenericModuleUseCase,
  ISearchGenericModuleUseCase,
  IUpdateGenericModuleUseCase,
  SearchGenericModuleInput,
  SearchGenericModuleOutput,
} from '../../domain'

export class GenericModuleAdapter implements IGenericModuleRepository {
  constructor(
    private readonly createGenericModuleService: ICreateGenericModuleUseCase,
    private readonly updateGenericModuleService: IUpdateGenericModuleUseCase,
    private readonly deleteGenericModuleService: IDeleteGenericModuleUseCase,
    private readonly getGenericModuleService: IGetGenericModuleUseCase,
    private readonly searchGenericModuleService: ISearchGenericModuleUseCase
  ) {}

  async create(
    item: CreateGenericModuleInput
  ): Promise<CreateGenericModuleOutput> {
    return this.createGenericModuleService.create(item)
  }

  async update(item: GenericModule): Promise<GenericModule> {
    return this.updateGenericModuleService.update(item)
  }

  async delete(itemId: string): Promise<void> {
    return this.deleteGenericModuleService.delete(itemId)
  }

  async get(itemId: string): Promise<GenericModule | null> {
    return this.getGenericModuleService.get(itemId)
  }

  async search(
    args: SearchGenericModuleInput
  ): Promise<SearchGenericModuleOutput> {
    return this.searchGenericModuleService.search(args)
  }
}
