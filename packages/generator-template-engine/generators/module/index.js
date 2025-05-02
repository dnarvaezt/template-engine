const Generator = require('yeoman-generator')
const Config = require('./config')
const FileSystemManager = require('./file-system-manager')
const path = require('path')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    const basePath = path.join(__dirname, '../../../..')

    this._configManager = new Config({
      base: basePath,
      baseName: 'generic-module',
      template: path.join(basePath, 'src/application/pages/generic-module'),
      destination: process.cwd(),
    })

    try {
      this._configManager.validate()
    } catch (error) {
      this.env.error(`Configuration error: ${error.message}`)
    }

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
    this._fileSystem.printTemplateStructure()
    this._fileSystem.copyTemplateFiles(this.answers.name)
  }
}
