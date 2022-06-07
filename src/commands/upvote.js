const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: "upvote", // COMMAND NAME
    description: "Upvote for the bot", // COMMAND DESCRIPTION
    help_menu: {
        display: true, // SHOWS IN HELP COMMAND (ANY MENU)
        devlock: false, // ONLY SHOWS FOR DEVS (?)
        admincat: "mod", // ADMINISTRATOR CATEGORY (PART OF DEVLOCK)
        category: "other" // THE CATEGORY
    },
    data: new SlashCommandBuilder()
        .setName('upvote')
        .setDescription('Wanna Upvote???')
    ,
    execute_m(client, message, args) { }, // THE EXECUTION THROUGH MESSAGE
    async execute_s(client, interaction) { // THE EXECUTION THROUGH SLASH COMMAND

        const embed = new MessageEmbed()
            .setTitle('Upvote On Top.gg')
            .setURL('https://discord.gg/fPHQeUkrkd')
            .setColor('#0099ff')
            .setDescription('**Vote on top.gg**\n https://top.gg/bot/849603776343310336/vote')

        await interaction.reply({ embeds: [embed] });
    }
}
