const path = require("path");
const getAppDir = (repository) => {
  const homedir = require("os").homedir();
  return path.join(homedir, "/.timber/apps", repository);
};

module.exports = {
  getAppDir,
};
