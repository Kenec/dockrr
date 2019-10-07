#!/usr/bin/env node
const program = require('commander');
const path = require('path');
const { exec } = require('child_process');
const {
  createDockerFile,
  checkFileExist,
  appPort
} = require('./creator');

program
  .version('0.0.1', '-v, --version')
  .description('A Docker wrapper for Node.js application');

program
  .command('generate')
  .alias('g')
  .description('Generate a Dockerfile based on the "dockr config in your package.json"')
  .action(function () {
    createDockerFile();
  });

program
  .command('build')
  .alias('b')
  .description('Build the Docker image using the Dockerfile generated.'
  + 'If no Dockerfile exists when this command is run, new Dockerfile will be generated')
  .action(function () {
    checkFileExist(path.join('Dockerfile'));
    exec('docker build -t dockr-app .', function (error, stdout, stderr) {
      if (error) {
        throw new Error(`exec error: ${error}`);
      }
      if (stdout) console.log(`stdout: ${stdout}`);
      if (stderr) console.log(`stderr: ${stderr}`);
    });
  });

program
  .command('run')
  .alias('r')
  .description('Run the Docker image built by the build command')
  .action(async function () {
    checkFileExist(path.join('Dockerfile'));
    const port = await appPort();
    exec(`docker run -d -p ${port}:${port} dockr-app`, function (error, stdout, stderr) {
      if (error) {
        throw new Error(`exec error: ${error}`);
      }
      if (stdout) console.log(`stdout: ${stdout}`);
      if (stderr) console.log(`stderr: ${stderr}`);
    });
  });

program
  .command('stop')
  .alias('s')
  .description('Stop the running container')
  .action(function () {
    checkFileExist(path.join('Dockerfile'));
    exec('docker stop $(docker container ls | grep dockr-app | awk \'{print $1}\')', function (error, stdout, stderr) {
      if (error) {
        throw new Error(`exec error: ${error}`);
      }
      if (stdout) console.log(`stdout: ${stdout}`);
      if (stderr) console.log(`stderr: ${stderr}`);
    });
  });

module.exports = program;
