const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const { execute } = require("./commands/hello");
const { Mistral } = require("@mistralai/mistralai");

const apiKey = process.env.MISTRAL_API_KEY;

const clientMistral = new Mistral({ apiKey: apiKey });

const express = require("express");
const app = express();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on("messageCreate", async message => {
  if (message.author.id === "1387720747367272488") return;

  if (message.content.includes("?") || message.content.toLowerCase().includes("ia")) {
    const res = await clientMistral.chat.complete({
      model: "mistral-large-latest",
      messages: [{ role: "user", content: message.content }],
    });

    message.reply(res.choices[0].message.content);
    return;
  }

  switch (message.content.toLowerCase()) {
    case "ben": {
      message.reply("ben le goat");
      break;
    }
    case "dark": {
      message.reply("mon petit darkinou");
      break;
    }
    case "ramzi": {
      message.reply("explose moi comme tu le fais si souvent");
      break;
    }
    case "cody": {
      message.reply("c'est qui cody?");
      break;
    }
    case "ruv": {
      message.reply("je savais pas quoi dire");
      break;
    }
    case "blague": {
      const url = "https://blague-api.vercel.app/api?mode=global";
      fetch(url)
        .then(res => res.json())
        .then(res => message.reply(res.blague + " " + res.reponse));
    }
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
app.listen(5000, () => console.log("server listening on port 5000"));
