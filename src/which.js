const exec = require('./exec');

const run = command => name =>
  exec(`${command} ${name}`)
    .then(res => res.stdout)
    .catch(_ => '');

module.exports = process.platform === 'win32' ? run('where') : run('which');
