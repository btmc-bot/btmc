const { MessageEmbed } = require("discord.js");

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

        const embed = new MessageEmbed()
            .setTitle(`${client.user.username} Help Menu`)
            .setDescription('Here are all of btmcs commands!');

    }
}

function packToCat(commands, cats) {
    commands.forEach(command => {
        if (command.help.devlock) cats['dev'].push(command);
        else cats[command.help_menu.category].push(command);
    });

    return cats;
}