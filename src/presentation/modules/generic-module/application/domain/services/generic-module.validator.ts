import { GenericModule } from '../entities'

export class GenericModuleValidator {
  static validate(genericModule: Partial<GenericModule>): void {
    if (!genericModule.name || genericModule.name.trim() === '') {
      throw new Error('GenericModule name is required')
    }
  }
}
