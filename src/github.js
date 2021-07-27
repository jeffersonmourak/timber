const shell = require("shelljs");
shell.config.silent = true;
const { Octokit } = require("@octokit/rest");
const fs = require("fs");

const { getAppDir } = require("./helper");

const connect = (auth) => {
  return new Octokit({
    auth,
  });
};

const commits = async (octokit, repository) => {
  const [owner, repo] = repository.split("/");
  const { data } = await octokit.rest.repos.listCommits({
    owner,
    repo,
  });

  return data;
};

const prepareProject = ({ token, repository }) => {
  const targetProject = getAppDir(repository);

  if (!fs.existsSync(targetProject)) {
    shell.mkdir("-p", targetProject);
  }

  shell.cd(targetProject);
  shell.exec(
    `git clone https://${token}:x-oauth-basic@github.com/${repository} .`
  );
  shell.exec(`git pull --rebase origin master`);
};

const currentHead = ({ repository }) => {
  const targetProject = getAppDir(repository);
  shell.cd(targetProject);
  const { stdout: head } = shell.exec(`git rev-parse HEAD`);

  return head.split("\n")[0];
};

const setHead = ({ repository }, sha) => {
  const targetProject = getAppDir(repository);
  shell.cd(targetProject);

  shell.exec(`git pull`);
  shell.exec(`git reset --hard ${sha}`);
};

module.exports = { connect, commits, prepareProject, currentHead, setHead };
