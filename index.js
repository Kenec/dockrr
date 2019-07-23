const { createDockerFile } = require('./src/creator');
/**
 * Main function
 * @param {object} config
 * @return {null}
 */
function main() {
  createDockerFile();
}

main();
