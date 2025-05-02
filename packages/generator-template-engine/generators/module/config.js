class Config {
  constructor() {
    this.base = null
    this.baseName = null
    this.templates = null
    this.destination = null
  }

  getPath(key) {
    return this[key]
  }

  get(key) {
    return this[key]
  }

  /**
   * Convierte un string a camelCase
   *
   * @param {string} str - String a convertir
   * @returns {string} String en camelCase
   */
  toCamelCase(str) {
    return str
      .replace(/[-_]([a-z])/g, (_, letter) => letter.toUpperCase())
      .replace(/^[A-Z]/, (letter) => letter.toLowerCase())
  }

  /**
   * Convierte un string a kebab-case
   *
   * @param {string} str - String a convertir
   * @returns {string} String en kebab-case
   */
  toKebabCase(str) {
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
   */
  toPascalCase(str) {
    return str
      .replace(/[-_]([a-z])/g, (_, letter) => letter.toUpperCase())
      .replace(/^[a-z]/, (letter) => letter.toUpperCase())
  }

  /**
   * Convierte un string a snake_case
   *
   * @param {string} str - String a convertir
   * @returns {string} String en snake_case
   */
  toSnakeCase(str) {
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
   */
  getTransformations(str) {
    return {
      camel: this.toCamelCase(str),
      kebab: this.toKebabCase(str),
      pascal: this.toPascalCase(str),
      snake: this.toSnakeCase(str),
    }
  }
}

module.exports = Config
