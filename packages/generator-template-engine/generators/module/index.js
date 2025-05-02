const Generator = require('yeoman-generator')
const Config = require('./config')
const FileSystemManager = require('./file-system-manager')
const path = require('path')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this._configManager = new Config()

    // Configuración estática de rutas
    const basePath = path.join(__dirname, '../../../..')
    this._configManager.base = basePath
    this._configManager.baseName = 'generic-module'
    this._configManager.template = path.join(
      basePath,
      'src/application/pages/generic-module'
    )
    this._configManager.destination = process.cwd()

    // Inicializar el gestor de sistema de archivos
    this._fileSystem = new FileSystemManager(this._configManager)
  }

  async prompting() {
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your module?',
        default: this.appname,
      },
    ])

    this.answers = answers
  }

  writing() {
    // Imprimir la estructura del directorio base
    this._fileSystem.printTemplateStructure()

    // Copiar los archivos del template al nuevo directorio
    this._fileSystem.copyTemplateFiles(this.answers.name)
  }
}
