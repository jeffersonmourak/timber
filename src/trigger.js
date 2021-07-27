const shell = require("shelljs");
const { getAppDir } = require("./helper");

let currentProcess = null;

const start = ({ install, start, deploy, repository }) => {
  const appDir = getAppDir(repository);

  shell.cd(appDir);

  shell.exec(install);
  if (currentProcess !== null) {
    throw new Error("No process can be open during the start.");
  }

  deploy.forEach(command => {
    shell.exec(command);
  })

  currentProcess = shell.exec(start, { async: true });
};

const stop = () => {
  currentProcess.kill();
}

// const reload = ()

module.exports = { start, stop };
