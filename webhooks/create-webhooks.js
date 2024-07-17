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
  for (const channels of client.c.cache) {
    const channels = guilds.
    console.log(channels)
    for (const channel of channels.values()) {
      const fetchedWebhooks = await channel.fetchWebhooks();
      console.log(channel)
      webhooks.push(...fetchedWebhooks);
      console.log(fetchedWebhooks)
    }
  }
  webhook = webhooks
  console.log(webhooks)
  return webhooks;
}
client.on('ready', () => {
  getWebhooks()
})

async function sendMessage(message, author, avatar, channelId) {
  const channel = client.channels.cache.get(channelId);
  if (channel) {
    console.log(`Sending message is working!`)
    console.log(channelId)
      console.log(`Sending message is working still!`)
      const webhooks = webhook.find(webhook => webhook.channel === channel)
      console.log(webhook.find(webhook => webhook.channel === channel))
      await webhooks.send({
        content: message,
        username: author,
        avatarURL: avatar,
      });
    }
  }
client.on('messageCreate', (message) => {
  if (message.webhookId) return
  if (message.author.bot) return
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
    const allChannels = fs.readFileSync(path.join(__dirname, 'webhooks/channels.txt'), 'utf-8').split('\n'); 
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
    getWebhooks()
  }
});
client.on('messageCreate', (message) => {
  if (message.webhookId) return
  if (message.author.bot) return
  const allChannels = fs.readFileSync(path.join(__dirname, 'webhooks/channels.txt'), 'utf-8').split('\n')
  if (!allChannels.includes(message.channel.id)) return
  console.log(`Message from ${message.author.username}: ${message.content}`)
  for (const channel of allChannels) {
    console.log(message.channel.id !== channel)
    console.log(message.channel.id)
    console.log(channel)
    if (channel === '') break
    if (!message.channel.id !== channel) {
      sendMessage(message.content, message.author.username, message.author.avatarURL(), channel)
    }
  }
})


client.login(process.env.token);