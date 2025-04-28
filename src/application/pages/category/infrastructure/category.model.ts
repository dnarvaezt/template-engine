import { BaseEntity } from 'src/infrastructure'

export class CategoryModel extends BaseEntity {
  public name!: string

  constructor(init: Partial<CategoryModel> = {}) {
    super(init)
    Object.assign(this, init)
  }
}
