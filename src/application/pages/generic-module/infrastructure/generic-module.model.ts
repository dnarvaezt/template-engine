import { BaseEntity } from 'src/infrastructure'

export class GenericModuleModel extends BaseEntity {
  public name!: string

  constructor(init: Partial<GenericModuleModel> = {}) {
    super(init)
    Object.assign(this, init)
  }
}
