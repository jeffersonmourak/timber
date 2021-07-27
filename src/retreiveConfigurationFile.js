const fs = require("fs");
const path = require("path");
const currentDir = process.cwd();

const timberFilePath = path.join(currentDir, "timber.json");

const retreiveConfig = () => {
  if (!fs.existsSync(timberFilePath)) {
    return;
  }

  return JSON.parse(fs.readFileSync(timberFilePath, "utf-8"));
};

module.exports = retreiveConfig;
