const fs = require('fs'),
  path = require('path');

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

async function readConfig() {
  const filePath = path.join('package.json');
  try {
    const result = await fs.readFileSync(filePath, { encoding: 'utf-8' });
    return result;
  } catch (error) {
    throw error;
  }
}

async function generateDockerFile() {
  const configFile = await readConfig();
  const CMD = ['node', 'index.js'];
  const options = '--interval=30s --timeout=30s --start-period=30s --retries=4';
  const command = 'curl -f http://localhost/ || exit 1';

  if (JSON.parse(configFile).dockr) {
    console.log(JSON.parse(configFile).dockr);
  }

  let Dockerfile = generateFrom('node:' + getNodeVersion());
  Dockerfile += '\n' + generateAdd('.', '.');
  Dockerfile += '\n' + generateHealthcheck(options, command);
  Dockerfile += '\n' + generateExpose(3000);
  Dockerfile += '\n' + generateCmd(CMD);

  return Dockerfile;
}

async function createDockerFile() {
  try {
    fs.writeFile('Dockerfile', generateDockerFile(), function (error) {
      if (error) console.log(error);
    });
  } catch (error) {
    throw error;
  }
}

module.exports = { createDockerFile };
