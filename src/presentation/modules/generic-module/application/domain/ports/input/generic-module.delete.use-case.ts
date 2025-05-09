export interface DeleteGenericModuleUseCase {
  execute(itemId: string): Promise<void>
}
