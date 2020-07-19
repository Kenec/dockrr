# dockrr

[![Build Status](https://travis-ci.org/Kenec/dockrr.svg?branch=master)](https://travis-ci.org/Kenec/dockrr)
[![Coverage Status](https://coveralls.io/repos/github/Kenec/dockrr/badge.svg?branch=master)](https://coveralls.io/github/Kenec/dockrr?branch=master)
<br>
**dockrr** is an an NPM package for auto generating Dockerfile, building docker image, running and stopping the docker container in Node.js. 

## Installation
```
npm install dockrr --save-dev
```

## Configuration
1. Setup the dockrr config file in your application ***package.json*** file
```
...

"dockrr":{
    "cmd": "node index.js",
    "expose": 3000,
    "env": [
        { "name": "name 1" },
        { "metadata": "meta data 1" },
        { "path": "Log Path 1" }
      ],
    "label": [
        { "version": "1.0" }, 
        { "description": "A sample label" },
        { "maintainer": "nnamani.kenechukwu@gmail.com" }
      ],
    "workdir": "/app"
  },
```

2. Add script to generate Dockerfile, build docker image, start and stop docker container in your ***scripts*** section of ***package.json*** file
```
....

"scripts": {
    "start": "node index.js",
    "dockrr-generate": "node ./node_modules/dockrr generate",
    "dockrr-build": "node ./node_modules/dockrr build",
    "dockrr-run": "node ./node_modules/dockrr run",
    "dockrr-stop": "node ./node_modules/dockrr stop"
  },
```

Alternatively, we can use *dockrr* aliases such as
```
....

"scripts": {
    "start": "node index.js",
    "dockrr-generate": "node ./node_modules/dockrr g",
    "dockrr-build": "node ./node_modules/dockrr b",
    "dockrr-run": "node ./node_modules/dockrr r",
    "dockrr-stop": "node ./node_modules/dockrr s"
  },
```

### Usage
1. To generate Dockerfile for your application, run
```
npm run dockrr-generate
```

2. To build docker image using the generated Dockerfile, run
```
npm run dockrr-build
```

3. To run the docker container using the built image, run
```
npm run dockrr-run
```
***Visit the application on your web browser on `http://localhost:<port number>/`***

4. To stop the docker container, run
```
npm run dockrr-stop
```

### dockrr config commands
| Commands      | Description                                                       | Type                | Required  |
| ------------- |:------------------------------------------------------------------|:--------------------| :---------|
| **cmd**       | Command that docker will use to start your application            | String              | **True**  |
| **expose**    | The application port which you want the container to run on       | Integer             | **True**  |
| **env**       | The environment variables for docker                              | Array of Objects    | **False** |
| **label**     | Key value pair of metadata to the image                           | Array of Objects    | **False** |
| **workdir**   | The working directory in the Dockerfile                           | String              | **False** |


### ISSUES
To report an issue or give feedback, Click link
[Issues and Feedback](https://github.com/Kenec/dockrr/issues)

### Contributing
We are more than happy to have you contribute to this project.

### License
[MIT](https://github.com/Kenec/dockrr/blob/master/LICENSE)
