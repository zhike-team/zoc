const shell = require('shelljs')
const inquirer = require('inquirer')
const func = require('../common/func')

exports.command = 'logs [keyword]'
exports.desc = 'Output pods logs'

exports.handler = function (argv) {
  const filteredPods = func.getFilteredPods(argv)

  inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedPods',
      message: `Please choose pods to see the logs:`,
      choices: filteredPods.map(p => {
        return { name: p }
      }),
      validate: function (answers) {
        if (answers.length < 1) {
          return 'Please choose at least one.'
        }
        return true
      }
    }
  ]).then(function (answers) {
    const logsPods = answers.selectedPods.map(p => `oc logs -f --tail 1 ${p}`).join(' & ')
    shell.exec(`cat <(${logsPods})`, {
      shell: shell.which('bash').stdout
    })
  }).catch(function (e) {
    console.log(e.stack)
  })
}
