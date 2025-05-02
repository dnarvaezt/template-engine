class Config {
  /**
   * @typedef {Object} ConfigOptions
   * @property {string} base - Base path for the generator
   * @property {string} baseName - Base name for the module template
   * @property {string} template - Path to the template directory
   * @property {string} destination - Destination path for the generated module
   */

  /**
   * Casos de transformación disponibles
   *
   * @readonly
   */
  static TRANSFORMATION_CASES = {
    CAMEL: 'camel',
    KEBAB: 'kebab',
    PASCAL: 'pascal',
    SNAKE: 'snake',
  }

  /**
   * Crea una nueva instancia de Config
   *
   * @param {ConfigOptions} [options] - Opciones de configuración
   * @throws {TypeError} Si algún parámetro no es del tipo esperado
   */
  constructor(options = {}) {
    this._validateOptions(options)
    this.base = options.base || null
    this.baseName = options.baseName || null
    this.template = options.template || null
    this.destination = options.destination || null
  }

  /**
   * Valida las opciones de configuración
   *
   * @private
   * @param {ConfigOptions} options - Opciones a validar
   * @throws {TypeError} Si algún parámetro no es del tipo esperado
   */
  _validateOptions(options) {
    const validations = {
      base: 'string',
      baseName: 'string',
      template: 'string',
      destination: 'string',
    }

    for (const [key, type] of Object.entries(validations)) {
      if (options[key] !== undefined && typeof options[key] !== type) {
        throw new TypeError(`La opción '${key}' debe ser de tipo ${type}`)
      }
    }
  }

  /**
   * Valida si todas las propiedades requeridas están establecidas
   *
   * @throws {Error} Si alguna propiedad requerida falta
   */
  validate() {
    const required = ['base', 'baseName', 'template', 'destination']
    const missing = required.filter((prop) => !this[prop])

    if (missing.length > 0) {
      throw new Error(`Faltan propiedades requeridas: ${missing.join(', ')}`)
    }
  }

  /**
   * Crea una copia profunda de la configuración actual
   *
   * @returns {Config} Nueva instancia de Config con los mismos valores
   */
  clone() {
    return new Config({
      base: this.base,
      baseName: this.baseName,
      template: this.template,
      destination: this.destination,
    })
  }

  /**
   * Valida si un string es válido para transformación
   *
   * @private
   * @param {string} str - String a validar
   * @throws {TypeError} Si el string no es válido
   */
  _validateString(str) {
    if (typeof str !== 'string') {
      throw new TypeError('El parámetro debe ser un string')
    }
    if (!str.trim()) {
      throw new Error('El string no puede estar vacío')
    }
  }

  /**
   * Convierte un string a camelCase
   *
   * @param {string} str - String a convertir
   * @returns {string} String en camelCase
   * @throws {TypeError} Si el string no es válido
   */
  toCamelCase(str) {
    this._validateString(str)
    return str
      .replace(/[-_]([a-z])/g, (_, letter) => letter.toUpperCase())
      .replace(/^[A-Z]/, (letter) => letter.toLowerCase())
  }

  /**
   * Convierte un string a kebab-case
   *
   * @param {string} str - String a convertir
   * @returns {string} String en kebab-case
   * @throws {TypeError} Si el string no es válido
   */
  toKebabCase(str) {
    this._validateString(str)
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[_\s]+/g, '-')
      .toLowerCase()
  }

  /**
   * Convierte un string a PascalCase
   *
   * @param {string} str - String a convertir
   * @returns {string} String en PascalCase
   * @throws {TypeError} Si el string no es válido
   */
  toPascalCase(str) {
    this._validateString(str)
    return str
      .replace(/[-_]([a-z])/g, (_, letter) => letter.toUpperCase())
      .replace(/^[a-z]/, (letter) => letter.toUpperCase())
  }

  /**
   * Convierte un string a snake_case
   *
   * @param {string} str - String a convertir
   * @returns {string} String en snake_case
   * @throws {TypeError} Si el string no es válido
   */
  toSnakeCase(str) {
    this._validateString(str)
    return str
      .replace(/([A-Z])/g, '_$1')
      .toLowerCase()
      .replace(/^_/, '')
  }

  /**
   * Obtiene todas las transformaciones de un string
   *
   * @param {string} str - String a transformar
   * @returns {Object} Objeto con todas las transformaciones
   * @throws {TypeError} Si el string no es válido
   */
  getTransformations(str) {
    this._validateString(str)
    return {
      [Config.TRANSFORMATION_CASES.CAMEL]: this.toCamelCase(str),
      [Config.TRANSFORMATION_CASES.KEBAB]: this.toKebabCase(str),
      [Config.TRANSFORMATION_CASES.PASCAL]: this.toPascalCase(str),
      [Config.TRANSFORMATION_CASES.SNAKE]: this.toSnakeCase(str),
    }
  }
}

module.exports = Config
