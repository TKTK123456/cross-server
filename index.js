import { Client, GatewayIntentBits, Collection, Events, Activity, SlashCommandBuilder} from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import getWebooks from './webhooks/create-webhooks.js'
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });
const __dirname = path.resolve();
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('Cross Server', { type: Activity.Playing });
});

client.login(process.env.TOKEN);