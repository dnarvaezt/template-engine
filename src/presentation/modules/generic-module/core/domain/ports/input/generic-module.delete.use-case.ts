export interface IDeleteGenericModuleUseCase {
  delete(itemId: string): Promise<void>
}
