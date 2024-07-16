import { Client, GatewayIntentBits, Collection, Events, Activity, SlashCommandBuilder} from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });
const __dirname = path.resolve();
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('Cross Server', { type: Activity.Playing });
});
fs.watchFile('webhooks/create-webhooks.js', (err, data) => {
  if (err) throw err;
  console.log(data);
});

client.login(process.env.TOKEN);