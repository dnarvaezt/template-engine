import { BaseEntity } from '../models/BaseEntity';
import { BaseRepository } from '../repositories/BaseRepository';

export abstract class BaseService<T extends BaseEntity> {
  constructor(protected repository: BaseRepository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<T | null> {
    return this.repository.findById(id);
  }

  async save(entity: T): Promise<void> {
    await this.repository.save(entity);
  }

  async delete(id: string): Promise<void> {
    if (!(await this.repository.exists(id))) {
      throw new Error('Entity not found');
    }
    await this.repository.delete(id);
  }
}
