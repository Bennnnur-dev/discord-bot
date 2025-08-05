const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const { execute } = require("./commands/hello");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on("messageCreate", message => {
  if (message.author.id === "1387720747367272488") return;
  if (message.content.includes("")) {
    message.reply(message.content + " (je te casse les couilles)");
    message.return;
  }
});

client.on("interactionCreate", async interaction => {
  console.log(interaction);
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName.toLowerCase() === "hello") {
    await execute(interaction);
  }
});

client.login(process.env.BOT_TOKEN);
