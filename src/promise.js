const { appendFileSync } = require("fs");

function sendEmail(name, logger) {
  console.log(`email sent to ${name}...`);

  logger(name);
}

function logIntoAFile(name) {
  appendFileSync("email-log.txt", `\nemail sent to ${name}`);
}

sendEmail("hari", logIntoAFile);