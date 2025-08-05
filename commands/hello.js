const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder().setName("hello").setDescription("Replies with a greeting!");

async function execute(interaction) {
  await interaction.reply("Hi!");
}

module.exports = { data, execute };
