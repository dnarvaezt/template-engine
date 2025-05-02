const templates = require('./templates.json')
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  async prompting() {
    this.log(`Template Generator`)

    this.answers = await this.prompt([
      {
        type: 'list',
        name: 'template',
        message: 'Select a template:',
        choices: Object.keys(templates),
        default: Object.keys(templates)[0],
      },
    ])

    const { template } = this.answers
    this.log('Template selected: ', template)
    this.composeWith(require.resolve(templates[template]))
  }

  end() {
    this.log('\nFinished generating!\nGo!!!')
  }
}
