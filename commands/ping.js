module.exports = {
  execute: (api, message, args) => {
    api.sendMessage("Pong! Bot is active and running. ✅", message.threadID);
  }
};
