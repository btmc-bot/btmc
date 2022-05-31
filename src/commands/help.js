const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "help",
    description: "Displays all commands",
    help_menu: {
        display: true,
        devlock: false,
        category: "info"
    },
    data: {
        name: 'help',
        description: 'Displays all commands',
    },
    execute_m(message, args, client) { },
    execute_s(interaction, args, client) {
        const __commands = client.commands.array();

        const _commands = __commands.filter(command => command.help_menu.display);

        let commands = {
            info: [],
            fun: [],
            mod: [],
            dev: [],
            music: [],
            other: []
        }
        commands = packToCat(_commands, commands);

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('help_displaylocked')
                    .setLabel('Show locked commands')
                    .setStyle('DANGER')
            )
        //

        const embed = new MessageEmbed()
            .setTitle(`${client.user.username} Help Menu`)
            .setDescription('Here are all of btmcs commands!')
            .addFields(
                { name: 'Info', value: commands.info.map(command => `\`${command.name}\`\n> ${command.description}`).join(', ') },
                { name: 'Fun', value: commands.fun.map(command => `\`${command.name}\`\n> ${command.description}`).join(', ') },
                { name: 'Moderation', value: commands.mod.map(command => `\`${command.name}\`\n> ${command.description}`).join(', ') },
                { name: 'Music', value: commands.music.map(command => `\`${command.name}\`\n> ${command.description}`).join(', ') },
                { name: 'Other', value: commands.other.map(command => `\`${command.name}\`\n> ${command.description}`).join(', ') },
            )
        //

        interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
    }
}

function packToCat(commands, cats) {
    commands.forEach(command => {
        if (command.help.devlock) cats['dev'].push(command);
        else cats[command.help_menu.category].push(command);
    });

    return cats;
}