const templates = require('./templates.json')
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  initializing() {
    this.log('\n🚀 Welcome to Template Generator!')
    this.log("Let's create something amazing together!\n")
  }

  async prompting() {
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
    this.composeWith(require.resolve(templates[template]))
  }

  end() {
    this.log('\n✨ Template generated successfully!')
    this.log('Happy coding! 🎉\n')
  }
}
