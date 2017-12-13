const readlineSync = require('readline-sync')
const shell = require('shelljs')

const fuzzy = (list, keyword) => list.filter(item => new RegExp(keyword.split('').map(c => c.replace(/[.?*+^$[\]\\(){}|]/g, '\\$&')).join('.*'), 'i').test(item))

const getFilteredPods = function (argv) {
  const keyword = argv.keyword || argv.defaultKeyword
  let listPods = shell.exec('oc get pods --no-headers -o=custom-columns=NAME:.metadata.name', {
    silent: true
  })

  if (listPods.code > 0) {
    const username = argv.username ? argv.username : readlineSync.question('Please input your oc username: ')
    const password = argv.password ? argv.password : readlineSync.question('Please input your oc passworld: ', {
      hideEchoBack: true
    })
    const host = argv.host ? argv.host : ''
    shell.exec(`oc login -u ${username} -p ${password} ${host}`)
    listPods = shell.exec('oc get pods --no-headers -o=custom-columns=NAME:.metadata.name', {
      silent: true
    })
  }

  const pods = listPods.stdout.trim().split('\n')
  const filteredPods = fuzzy(pods, keyword)

  return filteredPods
}

module.exports = {
  getFilteredPods,
  fuzzy
}
