export interface DeleteProductUseCase {
  execute(itemId: string): Promise<void>
}
