const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const LOG_CHANNEL_ID = '1315300131695886407';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('🛑 Débannir un utilisateur')
    .addStringOption(option =>
      option.setName('id')
        .setDescription('ID de l’utilisateur à débannir')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const userId = interaction.options.getString('id');

    try {
      await interaction.guild.members.unban(userId);

      const embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle('✅ Utilisateur Débanni')
        .addFields({ name: 'ID Utilisateur', value: userId })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });

      const logChannel = interaction.guild.channels.cache.get(LOG_CHANNEL_ID);
      if (logChannel) logChannel.send({ embeds: [embed] });

    } catch (err) {
      return interaction.reply({ content: '❌ Impossible de débannir cet utilisateur.', ephemeral: true });
    }
  },
};
