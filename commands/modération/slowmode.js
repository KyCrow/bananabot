const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const logChannelId = '1315300131695886407'; // 🔁 Remplace par l'ID de ton salon de logs

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slowmode')
    .setDescription('🐢 Active ou désactive le slowmode dans le salon.')
    .addIntegerOption(option =>
      option.setName('secondes')
        .setDescription('Nombre de secondes entre chaque message (0 pour désactiver)')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const secondes = interaction.options.getInteger('secondes');
    const channel = interaction.channel;

    if (secondes < 0 || secondes > 21600) {
      return interaction.reply({ content: '❌ Tu dois choisir un nombre entre 0 et 21600 secondes (6 heures).', ephemeral: true });
    }

    await channel.setRateLimitPerUser(secondes);

    await interaction.reply(`🐢 Slowmode mis à jour : \`${secondes} seconde(s)\` dans <#${channel.id}>.`);

    // Logs
    const logChannel = interaction.guild.channels.cache.get(logChannelId);
    if (logChannel) {
      logChannel.send({
        embeds: [{
          title: '🐢 Slowmode modifié',
          description: `**Par :** ${interaction.user.tag}\n**Salon :** <#${channel.id}>\n**Valeur :** ${secondes} seconde(s)`,
          color: 0x00ffff,
          timestamp: new Date()
        }]
      });
    }
  }
};
