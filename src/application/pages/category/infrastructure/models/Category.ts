import { BaseEntity } from 'src/infrastructure';

export class Category extends BaseEntity {
  public name!: string;

  constructor(init: Partial<Category> = {}) {
    super(init);
    Object.assign(this, init);
    this.validate();
  }

  private validate(): void {
    if (!this.name) {
      throw new Error('Name is required');
    }
    if (this.name.length < 3) {
      throw new Error('Name must be at least 3 characters');
    }
    if (this.name.length > 50) {
      throw new Error('Name cannot exceed 50 characters');
    }
  }

  public updateName(name: string): Category {
    const updated = new Category({
      ...this,
      name,
      updatedAt: new Date(),
    });
    updated.validate();
    return updated;
  }
}
