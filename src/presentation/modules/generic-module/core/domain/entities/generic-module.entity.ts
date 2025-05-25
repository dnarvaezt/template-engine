export class GenericModule {
  public readonly id!: string
  public name!: string

  constructor(init: Partial<GenericModule> = {}) {
    Object.assign(this, init)
  }
}
