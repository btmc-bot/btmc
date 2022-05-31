const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: "help", // COMMAND NAME
    description: "Displays all commands", // COMMAND DESCRIPTION
    help_menu: {
        display: true, // SHOWS IN HELP COMMAND (ANY MENU)
        devlock: false, // ONLY SHOWS FOR DEVS (?)
        admincat: "mod", // ADMINISTRATOR CATEGORY (PART OF DEVLOCK)
        category: "info" // THE CATEGORY
    },
    data: { // SLASH COMMAND DATA
        name: 'help',
        description: 'Displays all commands',
    },
    execute_m(client, message, args) { }, // THE EXECUTION THROUGH MESSAGE
    execute_s(client, interaction) { } // THE EXECUTION THROUGH SLASH COMMAND
}