const readlineSync = require('readline-sync')
const shell = require('shelljs')

const fuzzy = (list, keyword) => list.filter(item => new RegExp(keyword.split('').map(c => c.replace(/[.?*+^$[\]\\(){}|]/g, '\\$&')).join('.*'), 'i').test(item))

const getFilteredPods = function (argv) {
  argv.oc = argv.oc || {}
  const keyword = argv.keyword || argv.defaultKeyword
  let listPods = shell.exec('oc get pods --no-headers -o=custom-columns=NAME:.metadata.name', {
    silent: true
  })

  if (listPods.code > 0) {
    const username = argv.oc.username ? argv.oc.username : readlineSync.question('Please input your oc username: ')
    const password = argv.oc.password ? argv.oc.password : readlineSync.question('Please input your oc passworld: ', {
      hideEchoBack: true
    })
    const host = argv.oc.host ? argv.oc.host : ''
    shell.exec(`oc login -u ${username} -p ${password} ${host}`)
    listPods = shell.exec('oc get pods --no-headers -o=custom-columns=NAME:.metadata.name', {
      silent: true
    })
  }

  const pods = listPods.stdout.trim().split('\n')
  const filteredPods = keyword ? fuzzy(pods, keyword) : pods

  return filteredPods
}

module.exports = {
  getFilteredPods,
  fuzzy
}
