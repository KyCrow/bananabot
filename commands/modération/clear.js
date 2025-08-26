const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

const logChannelId = '1315300131695886407'; // Remplace par l'ID de ton salon de logs

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('🧹 Supprime un nombre de messages spécifié dans le salon.')
    .addIntegerOption(option =>
      option.setName('nombre')
        .setDescription('Nombre de messages à supprimer (max 100)')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger('nombre');

    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
      return interaction.reply({ content: "❌ Tu n’as pas la permission de gérer les messages.", ephemeral: true });
    }

    if (amount < 1 || amount > 100) {
      return interaction.reply({ content: "❌ Tu dois spécifier un nombre entre 1 et 100.", ephemeral: true });
    }

    await interaction.channel.bulkDelete(amount, true).catch(err => {
      console.error(err);
      return interaction.reply({ content: "❌ Une erreur est survenue lors de la suppression des messages.", ephemeral: true });
    });

    await interaction.reply({ content: `✅ ${amount} message(s) ont été supprimés.`, ephemeral: true });

    // Log de l'action
    const logChannel = interaction.guild.channels.cache.get(logChannelId);
    if (logChannel) {
      const embed = new EmbedBuilder()
        .setTitle('🧹 Suppression de messages')
        .setDescription(`**Utilisateur :** ${interaction.user.tag}\n**Salon :** <#${interaction.channel.id}>\n**Messages supprimés :** ${amount}`)
        .setColor(0xffcc00)
        .setTimestamp();

      logChannel.send({ embeds: [embed] });
    } else {
      console.log("Salon de logs introuvable !");
    }
  },
};
