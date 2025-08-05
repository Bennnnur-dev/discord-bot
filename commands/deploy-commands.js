const { REST, Routes } = require("discord.js");
require("dotenv").config();
const { data: pingCommand } = require("./hello");

console.log(pingCommand.toJSON());

const commands = [pingCommand.toJSON()];
const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

async function deploy() {
  try {
    console.log("Registering slash commands...");
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log("Slash commands registered.");
  } catch (error) {
    console.error(error);
  }
}

deploy();
