const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: "support", // COMMAND NAME
    description: "Official support server for BTMC", // COMMAND DESCRIPTION
    help_menu: {
        display: true, // SHOWS IN HELP COMMAND (ANY MENU)
        devlock: false, // ONLY SHOWS FOR DEVS (?)
        admincat: "mod", // ADMINISTRATOR CATEGORY (PART OF DEVLOCK)
        category: "other" // THE CATEGORY
    },
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Need Support For BTMC?')
    ,
    execute_m(client, message, args) { }, // THE EXECUTION THROUGH MESSAGE
    execute_s(client, interaction) { // THE EXECUTION THROUGH SLASH COMMAND
        const embed = new MessageEmbed()
            .setTitle('Official Support Server')
            .setURL('https://discord.gg/fPHQeUkrkd')
            .setColor('#0099ff')
            .setDescription('Need Support For BTMC: [Join Our Official Server](https://discord.gg/fPHQeUkrkd)')
        //

        await interaction.reply({ embeds: [embed] });
    }
}