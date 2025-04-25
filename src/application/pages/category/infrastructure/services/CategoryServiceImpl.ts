import { Category } from '../models/Category';
import { CategoryRepository } from '../repositories/CategoryRepository';

import { CategoryService } from './CategoryService';

export class CategoryServiceImpl implements CategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  async getAllCategories(): Promise<Category[]> {
    return this.repository.findAll();
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return this.repository.findById(id);
  }

  async createCategory(category: Category): Promise<Category> {
    return this.repository.create(category);
  }

  async updateCategory(category: Category): Promise<Category> {
    return this.repository.update(category);
  }

  async deleteCategory(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
