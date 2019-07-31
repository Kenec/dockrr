const fs = require('fs'),
  path = require('path');
const constants = require('./constants');

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

function checkValidConfig(config) {
  if (!JSON.parse(config).dockr) throw new Error('Cannot Find "dockr" config in package.json');
  if (!JSON.parse(config).dockr.cmd) throw new Error('"dockr" config requires "cmd" object');
  if (!JSON.parse(config).dockr.expose) throw new Error('"dockr" config requires "expose" object');
  if (JSON.parse(config).dockr.label) {
    const labelContent = JSON.parse(config).dockr.label;
    if (Array.isArray(labelContent) === false) throw new Error('"dockr" config requires "label" to be an array');
  }
}

function dockerConfigFactory(config) {
  let dockerConfiguration = '';

  if (config.workdir) dockerConfiguration += constants.generateWorkdir(config.workdir) + '\n';
  if (config.label) {
    config.label.forEach(function (labelObjects) {
      dockerConfiguration += constants.generateLabel(`"${Object.keys(labelObjects)[0]}"`, `"${Object.values(labelObjects)[0]}"`) + '\n';
    });
  }
  return dockerConfiguration;
}

async function generateDockerFile() {
  const options = '--interval=30s --timeout=30s --start-period=30s --retries=4';
  const command = 'curl -f http://localhost/ || exit 1';

  try {
    const configFile = await readConfig();
    checkValidConfig(configFile);
    const config = JSON.parse(configFile).dockr;

    let Dockerfile = constants.generateFrom('node:' + getNodeVersion());
    Dockerfile += '\n' + dockerConfigFactory(config);
    Dockerfile += '\n' + constants.generateAdd('.', '.');
    Dockerfile += '\n' + constants.generateHealthcheck(options, command);
    Dockerfile += '\n' + constants.generateExpose(config.expose);
    Dockerfile += '\n' + constants.generateCmd(config.cmd.split(' '));

    return Dockerfile;
  } catch (error) {
    throw new Error(`Unable to read package.json file ${error}`);
  }
}

async function createDockerFile() {
  try {
    const dockerFile = await generateDockerFile();
    fs.writeFile('Dockerfile', dockerFile, function (error) {
      if (error) throw new Error(`Cannot write to Dockerfile ${error}`);
    });
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { createDockerFile };
