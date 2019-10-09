const {
  ADD,
  ARG,
  CMD,
  RUN,
  ENV,
  COPY,
  USER,
  FROM,
  SHELL,
  LABEL,
  EXPOSE,
  VOLUME,
  ONBUILD,
  WORKDIR,
  ENTRYPOINT,
  STOPSIGNAL,
  HEALTHCHECK
} = require('./dockerfileCommands');

function generateAdd(src, dest) {
  return `#The ADD instruction copies new files, directories or remote file URLs from <src> and adds them to the filesystem of the image at the path <dest>\n${ADD} ${src} ${dest}`;
}

function generateArg(name) {
  return `#The ARG instruction defines a variable that users can pass at build-time to the builder with the docker build command using the --build-arg <varname>=<value> flag\n${ARG} ${name}`;
}

function generateCmd(...commands) {
  return `#CMD provide defaults for an executing container\n${CMD} [ ${'"'
    + commands[0].join('", "')
    + '"'} ]`;
}

function generateRun(command) {
  return `#The RUN instruction will execute any commands in a new layer on top of the current image and commit the results\n${RUN} ${command}`;
}

function generateEnv(key, value) {
  return `#The ENV instruction sets the environment variable <key> to the value <value>\n${ENV} ${key} ${value}`;
}

function generateCopy(src, dest) {
  return `#The COPY instruction copies new files or directories from <src> and adds them to the filesystem of the container at the path <dest>\n${COPY} ${src} ${dest}`;
}

function generateUser(userOrGroup) {
  return `#The USER instruction sets the user name (or UID) and optionally the user group (or GID) to use when running the image\n${USER} ${userOrGroup}`;
}

function generateFrom(image) {
  return `#The FROM instruction initializes a new build stage and sets the Base Image for subsequent instructions\n${FROM} ${image}`;
}

function generateShell(...commands) {
  return `#The SHELL instruction allows the default shell used for the shell form of commands to be overridden\n${SHELL} [ ${'"'
    + commands[0].join('", "')
    + '"'} ]`;
}

function generateLabel(key, value) {
  return `#The LABEL instruction adds metadata to an image. A LABEL is a key-value pair\n${LABEL} ${key}=${value}`;
}

function generateExpose(port, protocol = 'tcp') {
  return `#The EXPOSE instruction informs Docker that the container listens on the specified network ports at runtime\n${EXPOSE} ${port}/${protocol}`;
}

function generateVolume(volume) {
  return `#The VOLUME instruction creates a mount point with the specified name and marks it as holding externally mounted volumes from native host or other containers.\n${VOLUME} ${volume}`;
}

function generateOnbuild(commands) {
  return `#The ONBUILD instruction adds to the image a trigger instruction to be executed at a later time, when the image is used as the base for another build.\n${ONBUILD} ${commands}`;
}

function generateWorkdir(directory) {
  return `#The WORKDIR instruction sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it in the Dockerfile\n${WORKDIR} ${directory}`;
}

function generateEntrypoint(...commands) {
  return `#An ENTRYPOINT allows you to configure a container that will run as an executable.\n${ENTRYPOINT} [ ${'"'
    + commands[0].join('", "')
    + '"'} ]`;
}

function generateStopsignal(signal) {
  return `#The STOPSIGNAL instruction sets the system call signal that will be sent to the container to exit\n${STOPSIGNAL} ${signal}`;
}

function generateHealthcheck(options, command) {
  return `#The HEALTHCHECK instruction tells Docker how to test a container to check that it is still working\n${HEALTHCHECK} ${options} ${CMD} ${command}`;
}

module.exports = {
  generateAdd,
  generateArg,
  generateCmd,
  generateRun,
  generateEnv,
  generateCopy,
  generateUser,
  generateFrom,
  generateShell,
  generateLabel,
  generateExpose,
  generateVolume,
  generateOnbuild,
  generateWorkdir,
  generateEntrypoint,
  generateStopsignal,
  generateHealthcheck
};
