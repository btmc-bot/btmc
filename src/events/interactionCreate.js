module.exports = function (client, interaction) {
  if (interaction.isCommand()) commandInteraction(client, interaction);
}

function commandInteraction(client, interaction) {
  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  command.execute_s(client, interaction);
}