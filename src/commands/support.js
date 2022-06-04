const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: "support",
    description: "Official support server for BTMC",
    help_menu: {
        display: true,
        devlock: false,
        admincat: "mod",
        category: "other"
    },
    data: new SlashCommandBuilder()
        .setName('Need Support For BTMC: Join Our Official Server')
        .setDescription('https://discord.gg/QFFtUnMhbP')
    ,
    execute_m(client, message, args) { }, 
    execute_s(client, interaction) { } 
}
