(function(){
  'use strict';

  var chalk = require('chalk'); // Text console.log formatting: https://github.com/sindresorhus/chalk/blob/master/readme.md

  module.exports = {
    styles: {
      mem: chalk.grey.dim,
      cmd: chalk.yellow,
      arg: chalk.cyan,
      fixedArg: chalk.magenta,
      id: chalk.red,
      name: chalk.white,
      tags: {
        default: chalk.bgYellow.black,
        done: chalk.inverse,
        meta: chalk.bgBlue.grey,
        q2: chalk.bgGreen.black,
        personal: chalk.bgCyan.black,
        okr: chalk.bgRed.black
      },
      incomplete: chalk.green,
      complete: function(){ return chalk.grey.dim(chalk.stripColor.apply(null, arguments));},
      other: chalk.grey,
      underline: chalk.underline
    },
    installPath: '/usr/local/lib/node_modules/mem2/',
    storagePath: '~/'
  };
})();
