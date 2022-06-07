// Dependencies --norm
const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const data = require('./config/other');

// Dependencies --ext
const Chalk = require('chalk');

// Constants
const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
});

// Variables
let unregSlashCommands = [];

// Other stuff
client.commands = new Collection();
const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    let slash = command.data.slash;
    unregSlashCommands.push(slash);
    console.log(Chalk.green(`Loaded command: ${command.name}`));
}

const eventFiles = readdirSync('./events').filter(file => file.endsWith('js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
    console.log(Chalk.green(`Loaded event: ${eventName}`));
}

// Guild Logs
client.on("guildCreate", async guild => { 
  
    const owner = await client.users.fetch(guild.ownerID)
    const channel = client.channels.cache.get(' (../other.js").Guild_Logs1} ')
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} | New Server`, client.user.avatarURL())
      .addField(`<:server:886748632165007401> Server`, `Name: \`${guild.name}\`\nID: \`${guild.id}\``)
      .addField(`<:crown:886748632152432640> Ownership`, `Name: \`${owner.tag}\`\nID: \`${guild.ownerID}\``)
      .addField(`<:info:886748632165007400> Server Info`, `Members: \`${guild.memberCount}\`\n> Channels: \`${guild.channels.cache.size}\`\n> Created: **${moment(guild.createdTimestamp).format('LL')}** (\`${moment(guild.createdTimestamp).fromNow()}\`)`)
      .setThumbnail(guild.iconURL({ dynamic:true }))
      .setColor('GREEN')
      .setTimestamp()
      .setFooter(`Total Guilds: ${client.guilds.cache.size}`)
      channel.send(embed)
  });

client.on("guildDelete", async guild => { 
  
    const owner = await client.users.fetch(guild.ownerID)
    const channel = client.channels.cache.get(' (../other.js").Guild_Logs1} ')
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} | Bot Removed`, client.user.avatarURL())
      .addField(`<:server:886748632165007401> Server`, `Name: \`${guild.name}\`\nID: \`${guild.id}\``)
      .addField(`<:crown:886748632152432640> Ownership`, `Name: \`${owner.tag}\`\nID: \`${guild.ownerID}\``)
      .addField(`<:info:886748632165007400> Server Info`, `Members: \`${guild.memberCount}\`\n> Channels: \`${guild.channels.cache.size}\`\n> Created: **${moment(guild.createdTimestamp).format('LL')}** (\`${moment(guild.createdTimestamp).fromNow()}\`)`)
      .setThumbnail(guild.iconURL({ dynamic:true }))
      .setColor('RED')
      .setTimestamp()
      .setFooter(`Total Guilds: ${client.guilds.cache.size}`)
      channel.send(embed)
  });

client.login(require('./config/token'));
