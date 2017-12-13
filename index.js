#!/usr/bin/env node

const findUp = require('find-up')
const fs = require('fs')
const configPath = findUp.sync(['.zocrc', '.zocrc.json'])
const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {}

require('yargs')
  .config(config)
  .commandDir('src/commands')
  .demandCommand(1, 'You need at least one command before moving on')
  .help('help')
  .alias('h', 'help')
  .alias('u', 'username')
  .alias('p', 'password')
  .alias('h', 'host')
  .argv
