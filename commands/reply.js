module.exports = {
  execute: (api, message, args) => {
    if (args.length === 0) {
      api.sendMessage("Usage: !reply <message>", message.threadID);
      return;
    }
    const replyMsg = args.join(" ");
    api.sendMessage(replyMsg, message.threadID);
  }
};
