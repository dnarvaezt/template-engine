import { Category } from './category.model'

export abstract class CategoryRepository {
  abstract search(): Promise<Category[]>
  abstract findById(id: string): Promise<Category | null>
  abstract create(category: Category): Promise<Category>
  abstract update(category: Category): Promise<Category>
  abstract delete(id: string): Promise<void>
}

export class CategoryWebRepository implements CategoryRepository {
  private readonly STORAGE_KEY = 'categories'
  private categories: Category[] = []
  private nextId = 1

  constructor() {
    this.loadFromStorage()
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      this.categories = parsed.categories.map((c: any) => new Category(c))
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

  async search(): Promise<Category[]> {
    return [...this.categories]
  }

  async findById(id: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.id === id)
    return category ? new Category(category) : null
  }

  async create(category: Category): Promise<Category> {
    const newCategory = new Category({
      ...category,
      id: this.nextId.toString(),
    })
    this.categories.push(newCategory)
    this.nextId++
    this.saveToStorage()
    return newCategory
  }

  async update(category: Category): Promise<Category> {
    const index = this.categories.findIndex((c) => c.id === category.id)
    if (index === -1) {
      throw new Error(`Categoría con ID ${category.id} no encontrada`)
    }

    const updatedCategory = new Category({
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
