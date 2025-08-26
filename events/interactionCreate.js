module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`Pas de commande correspondant à ${interaction.commandName}`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: '❌ Une erreur est survenue en exécutant cette commande.', ephemeral: true });
      } else {
        await interaction.reply({ content: '❌ Une erreur est survenue en exécutant cette commande.', ephemeral: true });
      }
    }
  },
};

