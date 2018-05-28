#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const exec = require('../src/exec');
const which = require('../src/which');
const UnsupportedPlatformError = require('../src/unsupported-platform-error');

const context = path.resolve(__dirname, '..');
const dockerfiles = path.join(context, 'dockerfiles');

async function test(platform) {
  try {
    const docker = await which('docker');

    if (!docker) {
      throw new UnsupportedPlatformError(
        'Unable to find docker executable in path'
      );
    }

    if (!platform) {
      throw new TypeError('You must specify a platform to test');
    }

    const dockerfile = path.join(dockerfiles, platform, 'Dockerfile');

    await exec(`docker build -t wt:${platform} -f ${dockerfile} ${context}`);
    await exec(`docker run --rm wt:${platform}`);
  } catch (err) {
    console.error(`Error when testing platform: ${platform}`);
    console.error(err.stdout);

    throw err;
  }
}

const isDirectory = source => name =>
  fs.lstatSync(path.resolve(source, name)).isDirectory();

const getDirectories = source =>
  fs.readdirSync(source).filter(isDirectory(source));

const main = () => Promise.all(getDirectories(dockerfiles).map(test));

main();
