const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: "TOS", // COMMAND NAME
    description: "Our terms of service", // COMMAND DESCRIPTION
    help_menu: {
        display: true, // SHOWS IN HELP COMMAND (ANY MENU)
        devlock: false, // ONLY SHOWS FOR DEVS (?)
        admincat: "mod", // ADMINISTRATOR CATEGORY (PART OF DEVLOCK)
        category: "other" // THE CATEGORY
    },
    data: new SlashCommandBuilder()
        .setName('TOS')
        .setDescription('Have A Read Of Our TOS')
    ,
    execute_m(client, message, args) { }, // THE EXECUTION THROUGH MESSAGE
    async execute_s(client, interaction) { // THE EXECUTION THROUGH SLASH COMMAND
        const embed = new MessageEmbed()
            .setTitle('Terms Of Service')
            .setURL('https://discord.gg/fPHQeUkrkd')
            .setColor('#0099ff')
            .setDescription('[Here Are Our Terms:](https://www.btmc.dev/terms/)')
        //

        await interaction.reply({ embeds: [embed] });
    }
}

