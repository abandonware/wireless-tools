const exec = require('./exec');
const which = require('./which');

const parseSection = section => {
  const name = section.match(/^([^:]+):/);

  return {
    name: name && name[1]
  };
};

const parse = ({stdout}) =>
  stdout
    .trim()
    .split(/\n\n/g)
    .map(parseSection);

exports.exists = () => which('ifconfig');

exports.status = async () => {
  return parse(await exec('ifconfig'));
};
