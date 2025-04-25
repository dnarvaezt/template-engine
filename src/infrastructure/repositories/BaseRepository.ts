import { BaseEntity } from '../models/BaseEntity'

export interface BaseRepository<T extends BaseEntity> {
  findAll(): Promise<T[]>
  findById(id: string): Promise<T | null>
  save(entity: T): Promise<void>
  delete(id: string): Promise<void>
  exists(id: string): Promise<boolean>
}
