const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

const catLink = {
    sys: {
        "cat_info": "info",
        "cat_moderation": "moderation",
        "cat_fun": "fun",
        "cat_music": "music",
        "cat_other": "other",
        "cat_all": "all"
    },
    text: {
        "info": "Information",
        "moderation": "Moderation",
        "fun": "Fun",
        "music": "Music",
        "other": "Other",
        "all": "All"
    }
}

module.exports = {
    name: "help",
    description: "Displays information about BTMC",
    help_menu: {
        display: true,
        devlock: false,
        category: "info"
    },
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays information about BTMC')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('The help command category you want to display')
                .setRequired(false)
                .addChoices(
                    { name: 'Information', value: 'cat_info' },
                    { name: 'Moderation', value: 'cat_moderation' },
                    { name: 'Fun', value: 'cat_fun' },
                    { name: 'Music', value: 'cat_music' },
                    { name: 'Other', value: 'cat_other' },
                    { name: 'All', value: 'cat_all' }
                )
        )
    ,
    execute_m(client, message, args) { },
    async execute_s(client, interaction) {
        const category = interaction.options.get('category').value;

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('help_showdev')
                    .setLabel('Show Hidden Commands')
                    .setStyle('DANGER')
            )
        //

        if (!category) {
            const embed = new MessageEmbed()
                .setTitle('BTMC Help')
                .setDescription('BTMC is a Multi Purpose discord bot made for any size of server')
                .addFields(
                    { name: 'Help Categories', value: 'Our help categories are Info, Moderation, Fun, Music, Other or you can get all commands using "all"', inline: true },
                    { name: 'Support', value: 'If you need help with BTMC, join our support server [here](https://discord.gg/fPHQeUkrkd)', inline: true },
                    { name: 'Website', value: 'BTMC\'s main website is [btmc.dev](https://btmc.dev) however we also have a [blog](https://blog.btmc.dev) site', inline: true }
                )
                .setColor('#32a89d');

            return await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
        }

        const hCategory = catLink.sys[category];
        const hText = catLink.text[hCategory];

        const commands = client.commands.filter(command => command.help_menu.category === hCategory && command.help_menu.display);

        const embed = new MessageEmbed()
            .setTitle('BTMC Help (' + hText.toLowerCase() + ')')
            .setDescription(hText + ' commands')
            .setColor('#32a89d');
        //

        if (category === 'cat_all') {
            const _commands = client.commands.filter(command => command.help_menu.display);

            _commands.forEach(command => {
                embed.addField(command.name, `${command.description}\nCategory: ${command.help_menu.category}`, true);
            });

            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (commands.size === 0) {
            return await interaction.reply({ content: 'There are no commands in this category', ephemeral: true });
        }

        commands.forEach(command => {
            embed.addField(command.name, command.description, true);
        })

        return await interaction.reply({ embeds: [embed], ephemeral: true });
    }
}