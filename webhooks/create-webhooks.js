import { Client, GatewayIntentBits, Collection, Events, Activity, SlashCommandBuilder, Webhook, ChannelType} from 'discord.js';
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




client.login(process.env.token);