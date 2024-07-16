import { Client, GatewayIntentBits, Collection, Events, Activity, SlashCommandBuilder} from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });

console.log('Runing create webhooks worked!')






client.login(process.env.token);