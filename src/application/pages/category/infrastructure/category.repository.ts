import { CategoryModel } from './category.model'

export abstract class CategoryRepository {
  abstract search(): Promise<CategoryModel[]>
  abstract findById(id: string): Promise<CategoryModel | null>
  abstract create(category: CategoryModel): Promise<CategoryModel>
  abstract update(category: CategoryModel): Promise<CategoryModel>
  abstract delete(id: string): Promise<void>
}

export class CategoryWebRepository implements CategoryRepository {
  private readonly STORAGE_KEY = 'categories'
  private categories: CategoryModel[] = []
  private nextId = 1

  constructor() {
    this.loadFromStorage()
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      this.categories = parsed.categories.map((c: any) => new CategoryModel(c))
      this.nextId = parsed.nextId
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify({
        categories: this.categories,
        nextId: this.nextId,
      })
    )
  }

  async search(): Promise<CategoryModel[]> {
    return [...this.categories]
  }

  async findById(id: string): Promise<CategoryModel | null> {
    const category = this.categories.find((category) => category.id === id)
    return category ? new CategoryModel(category) : null
  }

  async create(category: CategoryModel): Promise<CategoryModel> {
    const newCategory = new CategoryModel({
      ...category,
      id: this.nextId.toString(),
    })
    this.categories.push(newCategory)
    this.nextId++
    this.saveToStorage()
    return newCategory
  }

  async update(category: CategoryModel): Promise<CategoryModel> {
    const index = this.categories.findIndex((c) => c.id === category.id)
    if (index === -1) {
      throw new Error(`Categoría con ID ${category.id} no encontrada`)
    }

    const updatedCategory = new CategoryModel({
      ...category,
    })

    this.categories[index] = updatedCategory
    this.saveToStorage()
    return updatedCategory
  }

  async delete(id: string): Promise<void> {
    const index = this.categories.findIndex((category) => category.id === id)
    if (index === -1) {
      throw new Error(`Categoría con ID ${id} no encontrada`)
    }
    this.categories.splice(index, 1)
    this.saveToStorage()
  }
}
