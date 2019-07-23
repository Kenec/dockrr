const fs = require('fs');
const {
  generateFrom,
  generateAdd,
  generateCmd,
  generateExpose,
  generateHealthcheck
} = require('./constants');

function getNodeVersion() {
  return process.version.slice(1);
}

function generateDockerFile() {
  const CMD = ['node', 'index.js'];
  const options = '--interval=30s --timeout=30s --start-period=30s --retries=4';
  const command = 'curl -f http://localhost/ || exit 1';

  let Dockerfile = generateFrom('node:' + getNodeVersion());
  Dockerfile += '\n' + generateAdd('.', '.');
  Dockerfile += '\n' + generateHealthcheck(options, command);
  Dockerfile += '\n' + generateExpose(3000);
  Dockerfile += '\n' + generateCmd(CMD);

  return Dockerfile;
}

function createDockerFile() {
  try {
    fs.writeFile('Dockerfile', generateDockerFile(), function (error) {
      if (error) console.log(error);
    });
  } catch (error) {
    throw error;
  }
}

module.exports = { createDockerFile };
