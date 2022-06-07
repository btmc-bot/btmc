const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: "stats", // COMMAND NAME
    description: "gives all the stats and info about the bot", // COMMAND DESCRIPTION
    help_menu: {
        display: true, // SHOWS IN HELP COMMAND (ANY MENU)
        devlock: false, // ONLY SHOWS FOR DEVS (?)
        admincat: "mod", // ADMINISTRATOR CATEGORY (PART OF DEVLOCK)
        category: "info" // THE CATEGORY
    },
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Here are all the bots stats')
    ,
    execute_m(client, message, args) { }, // THE EXECUTION THROUGH MESSAGE
    async execute_s(client, interaction) { // THE EXECUTION THROUGH SLASH COMMAND
        const embed = new MessageEmbed()
            .setTitle('Stats')
            .setURL('https://discord.gg/fPHQeUkrkd')
            .setColor('#0099ff')
            .setDescription('[Need Support While Your here?](https://discord.gg/fPHQeUkrkd)')
            .addFields({

                name: ':ping_pong: Ping',

                value: `┕\`${Math.round(client.ws.ping)}ms\``,

                inline: true

            },

                {

                    name: '🗄️ Memory',

                    value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb\``,

                    inline: true

                })



        embed.addFields({

            name: ':homes: Servers',

            value: `┕\`${client.guilds.cache.size}\``,

            inline: true

        },

            {

                name: '👥 Users',

                value: `┕\`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}\``,

                inline: true

            }, {

            name: ':control_knobs: Channels',

            value: `┕\`${client.channels.cache.size.toLocaleString()}\``,

            inline: true

        })

        embed.addFields({

            name: '🤖 Version',

            value: `┕\`v${require("../../package.json").version}\``,

            inline: true

        }, {

            name: ':blue_book: Discord.js',

            value: `┕\`v${generateDJSVersion()}\``,

            inline: true

        }, {

            name: '📗 Node',

            value: `┕\`${process.version}\``,

            inline: true

        })


        await interaction.reply({ embeds: [embed] });
    }
}

function generateDJSVersion() {
    const PL = require('../../package-lock.json').dependencies["discord.js"].version;

    const PJ = require('../../package.json').dependencies["discord.js"]

    return PL ? PL : `(likely) ${PJ}`;
}
