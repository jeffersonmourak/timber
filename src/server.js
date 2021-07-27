const express = require("express");
const github = require("./github");
const trigger = require("./trigger");
const app = express();

const port = 3351;

const start = (config) => {
  app.get("/deploy", async (req, res) => {
    const octokit = github.connect(config.token);
    const headSha = github.currentHead(config);
    const [remoteHead, data] = await github.commits(octokit, config.repository);

    if (remoteHead.sha !== headSha) {
      trigger.stop();
      github.setHead(config, remoteHead.sha);
      trigger.start(config);
    }

    res.send({ deploy: "ok" });
  });

  app.get("/health", (req, res) => {
    res.send({ healthy: true });
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    trigger.start(config);
  });
};

module.exports = { start };
