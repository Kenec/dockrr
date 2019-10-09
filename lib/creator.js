const fs = require('fs'),
  path = require('path');
const constants = require('./constants');

function getNodeVersion() {
  return process.version.slice(1);
}

function checkFileExist(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${filePath} does not exist`);
  }
}

async function readConfig() {
  const packageJsonFile = path.join('package.json');
  checkFileExist(packageJsonFile);
  try {
    const result = await fs.readFileSync(packageJsonFile, { encoding: 'utf-8' });
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
  if (JSON.parse(config).dockr.env) {
    const envContent = JSON.parse(config).dockr.env;
    if (Array.isArray(envContent) === false) throw new Error('"dockr" config requires "env" to be an array');
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
  if (config.env) {
    config.env.forEach(function (envObjects) {
      dockerConfiguration += constants.generateEnv(`"${Object.keys(envObjects)[0]}"`, `"${Object.values(envObjects)[0]}"`) + '\n';
    });
  }
  return dockerConfiguration;
}

async function generateDockerFile() {
  try {
    const configFile = await readConfig();
    checkValidConfig(configFile);
    const config = JSON.parse(configFile).dockr;

    const options = '--interval=30s --timeout=30s --start-period=30s --retries=4';
    const command = `curl -f http://localhost:${config.expose}/ || exit 1`;

    const workdir = config.workdir || '.';

    let Dockerfile = constants.generateFrom('node:' + getNodeVersion());
    Dockerfile += '\n' + dockerConfigFactory(config);
    Dockerfile += '\n' + constants.generateAdd('.', workdir);
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

async function appPort() {
  const configFile = await readConfig();
  checkValidConfig(configFile);
  return JSON.parse(configFile).dockr.expose;
}

module.exports = {
  getNodeVersion,
  checkFileExist,
  readConfig,
  checkValidConfig,
  dockerConfigFactory,
  generateDockerFile,
  createDockerFile,
  appPort
};
