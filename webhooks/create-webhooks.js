import { Client, GatewayIntentBits, Collection, Events, Activity, SlashCommandBuilder, Webhook, ChannelType, PermissionFlagsBits} from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });
const __dirname = path.resolve();
console.log('Runing create webhooks worked!')
let webhook;
export default async function getWebhooks() {
  console.log('getting webhooks')
  const webhooks = [];
  for (const guilds of client.guilds.cache) {
    const channels = guilds.filter(channel => channel.type === ChannelType.GuildText);
    for (const channel of channels.values()) {
      const fetchedWebhooks = await channel.fetchWebhooks();
      webhooks.push(...fetchedWebhooks);
    }
  }
  webhook = webhooks
  return webhooks;
}
client.on('ready', () => {
  getWebhooks()
})
client.on('messageCreate', (message) => {
  if (!message.content.startsWith('<@1259210787210268682>')) return
  if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
    message.reply(message.author + ' You dont have permission to use this command!')
  return 
  } else if (message.content.startsWith(`<@1259210787210268682> setup cross server channel`)) {
    const channel = message.mentions.channels.first()
    if (!channel) {
      message.reply('Please mention a channel!')
      return
    }
    console.log(channel.name)
    const allChannels = fs.readFile(path.join(__dirname, 'webhooks/channels.txt'), 'utf-8',).split('\n');
    const channels = allChannels.find(channelList => channelList.includes(channel.id))
    if (channels !== undefined) {
      message.reply('This channel is already setup!')
      return
    }
    fs.appendFile(path.join(__dirname, 'webhooks/channels.txt'), channel.id + '\n' , (err) => {
      if (err) {
        console.log(err)
      }
    })
    channel.createWebhook({
      name: channel.id
    })
  }
});



client.login(process.env.token);