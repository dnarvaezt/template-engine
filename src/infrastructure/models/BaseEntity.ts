export abstract class BaseEntity {
  public id!: string;

  constructor(init: Partial<BaseEntity> = {}) {
    init.id ??= crypto.randomUUID()
    Object.assign(this, init);
  }
}
