const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help", // COMMAND NAME
    description: "Displays all commands", // COMMAND DESCRIPTION
    help_menu: {
        display: true,
        devlock: false,
        category: "info"
    },
    data: { // SLASH COMMAND DATA
        name: 'help',
        description: 'Displays all commands',
    },
    execute_m(message, args, client) { }, // THE EXECUTION THROUGH MESSAGE
    execute_s(interaction, args, client) { } // THE EXECUTION THROUGH SLASH COMMAND
}