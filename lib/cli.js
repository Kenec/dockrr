#!/usr/bin/env node
const program = require('commander');
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
    console.log('Docker Image Built!');
  });

program
  .command('run')
  .alias('r')
  .description('Run the Docker image built by the build command')
  .action(function () {
    console.log('Docker image is running!');
  });

program
  .command('stop')
  .alias('s')
  .description('Stop the running container')
  .action(function () {
    console.log('Docker container stopped!');
  });

module.exports = program;
