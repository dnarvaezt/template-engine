import { BaseEntity } from '../models'
import { Repository } from './repository'

export class WebRepository<T extends BaseEntity> implements Repository<T> {
  private readonly storageKey: string
  private entities: T[] = []
  private nextId = 1

  constructor(storageKey: string) {
    this.storageKey = storageKey
    this.loadFromStorage()
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.storageKey)
    if (stored) {
      const { entities, nextId } = JSON.parse(stored) || {
        entities: [],
        nextId: 1,
      }
      this.entities = entities?.map((e: any) => e) || []
      this.nextId = nextId
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify({
        entities: this.entities,
        nextId: this.nextId,
      })
    )
  }

  async search(): Promise<T[]> {
    return [...this.entities]
  }

  async get(id: string): Promise<T | null> {
    const entity = this.entities.find((entity) => entity.id === id)
    return entity ? entity : null
  }

  async set(entity: T): Promise<T> {
    const newEntity = {
      ...entity,
      id: this.nextId.toString(),
    } as T
    this.entities.push(newEntity)
    this.nextId++
    this.saveToStorage()
    return newEntity
  }

  async update(entity: T): Promise<T> {
    const index = this.entities.findIndex((e) => e.id === entity.id)
    if (index === -1) {
      throw new Error(`Entity with ID ${entity.id} not found`)
    }

    const updatedEntity = {
      ...entity,
    }

    this.entities[index] = updatedEntity
    this.saveToStorage()
    return updatedEntity
  }

  async delete(id: string): Promise<void> {
    const index = this.entities.findIndex((entity) => entity.id === id)
    if (index === -1) {
      throw new Error(`Entity with ID ${id} not found`)
    }
    this.entities.splice(index, 1)
    this.saveToStorage()
  }
}
