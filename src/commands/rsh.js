const inquirer = require('inquirer')
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))
const fuzzy = require('fuzzy')
const func = require('../common/func')
const { spawn } = require('child_process')

exports.command = 'rsh [keyword]'
exports.desc = 'Rsh onto a pod'

exports.handler = function (argv) {
  const filteredPods = func.getFilteredPods(argv)
  if (filteredPods.length === 1) {
    spawn('oc', ['rsh', filteredPods.shift()], {
      stdio: 'inherit'
    })
    return
  }

  inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'selectedPod',
      message: `Please choose pod to rsh:`,
      source: (answers, input) => {
        input = input || ''

        return new Promise(function (resolve) {
          const fuzzyResult = fuzzy.filter(input, filteredPods.sort())
          resolve(fuzzyResult.map(function (el) {
            return el.original
          }))
        })
      },
      validate: function (answers) {
        if (answers.length < 1) {
          return 'Please choose at least one.'
        }
        return true
      }
    }
  ]).then(function (answers) {
    spawn('oc', ['rsh', answers.selectedPod], {
      stdio: 'inherit'
    })
  }).catch(function (e) {
    console.log(e.stack)
  })
}
