import { Client, GatewayIntentBits, Collection, Events, Activity, SlashCommandBuilder, Webhook, ChannelType, PermissionFlagsBits} from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });
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
  } else if (message.content.toLowerCase.startsWith(`<@1259210787210268682> setup cross server channel `)) {
    const channel = message.mentions.channels.first()
    if (!channel) {
      message.reply('Please mention a channel!')
      return
    }
    const webhooks = webhook.filter(webhook => webhook.channelId === channel.id)
    if(webhook) {
      message.reply('This channel already has a webhook!')
    }
  }
});



client.login(process.env.token);