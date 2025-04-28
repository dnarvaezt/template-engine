import { BaseEntity } from '../models'

export class Repository<T extends BaseEntity> {
  async search(): Promise<T[]> {
    throw new Error('Method not implemented.')
  }

  async get(id: string): Promise<T | null> {
    throw new Error('Method not implemented.')
  }

  async set(item: T): Promise<T> {
    throw new Error('Method not implemented.')
  }

  async update(item: T): Promise<T> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
