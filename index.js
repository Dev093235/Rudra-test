const login = require("fca-unofficial");
const fs = require("fs");
const path = require("path");

// Load appstate.json for FB login
const appState = require("./appstate.json");

// Load all commands dynamically from commands folder
const commands = {};
const commandsPath = path.join(__dirname, "commands");
fs.readdirSync(commandsPath).forEach(file => {
  if (file.endsWith(".js")) {
    const commandName = file.replace(".js", "");
    commands[commandName] = require(path.join(commandsPath, file));
  }
});

login({ appState }, (err, api) => {
  if (err) return console.error("Login error:", err);

  console.log("Logged in successfully!");

  api.listenMqtt((err, message) => {
    if (err) return console.error(err);

    if (!message.body) return;

    const prefix = "!";
    if (!message.body.startsWith(prefix)) return;

    const args = message.body.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commands[commandName]) {
      try {
        commands[commandName].execute(api, message, args);
      } catch (error) {
        console.error("Error executing command:", error);
      }
    }
  });
});
