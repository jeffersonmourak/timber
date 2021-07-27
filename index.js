const server = require("./src/server");
const github = require("./src/github");
const retriveConfig = require("./src/retreiveConfigurationFile");
const config = retriveConfig();

github.prepareProject(config);
server.start(config);