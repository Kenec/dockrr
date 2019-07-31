#!/usr/bin/env node
const program = require('commander');
const { exec } = require('child_process');
const { createDockerFile } = require('./creator');

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
    exec('docker build -t dockr-test .', function (error, stdout, stderr) {
      if (error) {
        throw new Error(`exec error: ${error}`);
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  });

program
  .command('run')
  .alias('r')
  .description('Run the Docker image built by the build command')
  .action(function () {
    exec('docker run -d --name dockr-test -p 3000:3000 dockr-test', function (error, stdout, stderr) {
      if (error) {
        throw new Error(`exec error: ${error}`);
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  });

program
  .command('stop')
  .alias('s')
  .description('Stop the running container')
  .action(function () {
    exec('docker stop dockr-test', function (error, stdout, stderr) {
      if (error) {
        throw new Error(`exec error: ${error}`);
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  });

module.exports = program;
