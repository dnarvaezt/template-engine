const fs = require('fs')
const path = require('path')

class FileSystemManager {
  constructor(configManager) {
    this.configManager = configManager
  }

  /**
   * Reemplaza todas las variaciones de baseName con las correspondientes de
   * name en el contenido
   *
   * @param {string} content - Contenido del archivo
   * @param {Object} baseNameTransformations - Transformaciones de baseName
   * @param {Object} nameTransformations - Transformaciones de name
   * @returns {string} Contenido con los reemplazos realizados
   */
  replaceContent(content, baseNameTransformations, nameTransformations) {
    let newContent = content

    // Reemplazar cada variación de baseName con su correspondiente de name
    Object.keys(baseNameTransformations).forEach((key) => {
      const baseNamePattern = baseNameTransformations[key]
      const nameReplacement = nameTransformations[key]
      const regex = new RegExp(baseNamePattern, 'g')
      newContent = newContent.replace(regex, nameReplacement)
    })

    return newContent
  }

  /**
   * Converts a string to snake case
   *
   * @param {string} str - String to convert
   * @returns {string} Snake case string
   */
  toSnakeCase(str) {
    return str
      .replace(/([A-Z])/g, '_$1')
      .toLowerCase()
      .replace(/^_/, '')
  }

  /**
   * Imprime la estructura de archivos con niveles de indentación
   *
   * @param {Object} structure - Estructura del directorio
   * @param {number} level - Nivel de indentación actual
   * @param {string} prefix - Prefijo para la indentación
   */
  printStructure(structure, level = 0, prefix = '') {
    if (structure.error) {
      console.log(`${prefix}❌ ${structure.name} (${structure.error})`)
      return
    }

    // Imprimir el directorio actual
    console.log(`${prefix}📁 ${structure.name}/`)

    // Imprimir los hijos con indentación
    const newPrefix = prefix + '  '
    structure.children.forEach((child) => {
      if (child.type === 'directory') {
        this.printStructure(child, level + 1, newPrefix)
      } else if (child.type === 'file') {
        console.log(`${newPrefix}📄 ${child.name}`)
      } else if (child.type === 'error') {
        console.log(`${newPrefix}❌ ${child.name} (${child.error})`)
      }
    })
  }

  /** Imprime la estructura completa del directorio base */
  printTemplateStructure() {
    const structure = this.getTemplateStructure()
    console.log('\n📂 Base Structure:')
    console.log('=================')
    this.printStructure(structure)
  }

  /**
   * Verifica si un directorio existe
   *
   * @param {string} dir - Ruta del directorio
   * @returns {boolean}
   */
  directoryExists(dir) {
    try {
      return fs.statSync(dir).isDirectory()
    } catch (err) {
      return false
    }
  }

  /**
   * Lee recursivamente la estructura de directorios y archivos
   *
   * @param {string} dir - Directorio a leer
   * @param {string} baseDir - Directorio base para rutas relativas
   * @returns {Object} Estructura del directorio
   */
  readDirectoryStructure(dir, baseDir = dir) {
    if (!this.directoryExists(dir)) {
      return {
        name: path.basename(dir),
        type: 'directory',
        path: path.relative(baseDir, dir),
        children: [],
        error: 'Directory does not exist',
      }
    }

    const structure = {
      name: path.basename(dir),
      type: 'directory',
      path: path.relative(baseDir, dir),
      children: [],
    }

    try {
      const items = fs.readdirSync(dir)

      for (const item of items) {
        const fullPath = path.join(dir, item)
        try {
          const stat = fs.statSync(fullPath)

          if (stat.isDirectory()) {
            structure.children.push(
              this.readDirectoryStructure(fullPath, baseDir)
            )
          } else {
            structure.children.push({
              name: item,
              type: 'file',
              path: path.relative(baseDir, fullPath),
            })
          }
        } catch (err) {
          structure.children.push({
            name: item,
            type: 'error',
            path: path.relative(baseDir, fullPath),
            error: err.message,
          })
        }
      }
    } catch (err) {
      structure.error = err.message
    }

    return structure
  }

  /**
   * Obtiene la estructura completa del directorio base
   *
   * @returns {Object} Estructura completa del directorio
   */
  getTemplateStructure() {
    const basePath = this.configManager.getPath('templates')
    if (!this.directoryExists(basePath)) {
      return {
        error: `Base directory does not exist: ${basePath}`,
        path: basePath,
      }
    }
    return this.readDirectoryStructure(basePath)
  }

  /**
   * Obtiene la estructura del directorio de templates
   *
   * @returns {Object} Estructura del directorio de templates
   */
  getTemplatesStructure() {
    const templatesPath = this.configManager.getPath('templates')
    if (!this.directoryExists(templatesPath)) {
      return {
        error: `Templates directory does not exist: ${templatesPath}`,
        path: templatesPath,
      }
    }
    return this.readDirectoryStructure(templatesPath)
  }

  /**
   * Verifica si un archivo existe
   *
   * @param {string} filePath - Ruta del archivo
   * @returns {boolean}
   */
  fileExists(filePath) {
    try {
      return fs.statSync(filePath).isFile()
    } catch (err) {
      return false
    }
  }

  /**
   * Lee el contenido de un archivo
   *
   * @param {string} filePath - Ruta del archivo
   * @returns {string} Contenido del archivo
   */
  readFile(filePath) {
    if (!this.fileExists(filePath)) {
      throw new Error(`File does not exist: ${filePath}`)
    }
    return fs.readFileSync(filePath, 'utf8')
  }

  /**
   * Copia recursivamente los archivos del template a un nuevo directorio
   *
   * @param {string} moduleName - Nombre del nuevo módulo
   */
  copyTemplateFiles(moduleName) {
    const templatePath = this.configManager.getPath('templates')
    const destinationPath = path.join(
      this.configManager.getPath('destination'),
      moduleName
    )
    const baseName = this.configManager.get('baseName')

    // Obtener todas las transformaciones
    const baseNameTransformations =
      this.configManager.getTransformations(baseName)
    const nameTransformations =
      this.configManager.getTransformations(moduleName)

    // Crear el directorio de destino si no existe
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true })
    }

    // Función recursiva para copiar archivos
    const copyRecursive = (src, dest) => {
      const entries = fs.readdirSync(src, { withFileTypes: true })

      for (const entry of entries) {
        const srcPath = path.join(src, entry.name)
        let destName = entry.name

        // Solo renombrar archivos, no directorios
        if (entry.isFile()) {
          // Reemplazar en el nombre del archivo
          Object.keys(baseNameTransformations).forEach((key) => {
            const baseNamePattern = baseNameTransformations[key]
            const nameReplacement = nameTransformations[key]
            const regex = new RegExp(baseNamePattern, 'g')
            destName = destName.replace(regex, nameReplacement)
          })
        }

        const destPath = path.join(dest, destName)

        if (entry.isDirectory()) {
          fs.mkdirSync(destPath, { recursive: true })
          copyRecursive(srcPath, destPath)
        } else {
          // Leer el contenido del archivo
          const content = fs.readFileSync(srcPath, 'utf8')
          // Reemplazar el contenido
          const newContent = this.replaceContent(
            content,
            baseNameTransformations,
            nameTransformations
          )
          // Escribir el archivo con el nuevo contenido
          fs.writeFileSync(destPath, newContent)
        }
      }
    }

    copyRecursive(templatePath, destinationPath)
    console.log(`\n✅ Template files copied to: ${destinationPath}`)
  }
}

module.exports = FileSystemManager
