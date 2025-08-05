const { REST, Routes } = require("discord.js");
require("dotenv").config();
const { data: pingCommand } = require("./hello");

const commands = [pingCommand.toJSON()];
const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

async function deploy() {
  try {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
  } catch (error) {
    console.error(error);
  }
}

deploy();
