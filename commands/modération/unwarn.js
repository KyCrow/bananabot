const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const warnFilePath = path.join(__dirname, '../../data/warnings.json');
const LOG_CHANNEL_ID = '1315300131695886407'; // Remplace par l'ID de ton salon de logs

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unwarn')
    .setDescription('❌ Retire un avertissement à un membre.')
    .addUserOption(option =>
      option.setName('membre')
        .setDescription('Le membre dont retirer un avertissement')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('index')
        .setDescription('Numéro de l\'avertissement à retirer (1 = premier avertissement)')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const member = interaction.options.getMember('membre');
    const userId = member.user.id;
    const index = interaction.options.getInteger('index') - 1; // L'utilisateur donne 1 pour le premier warn

    // Charger les avertissements
    let warnings = {};
    if (fs.existsSync(warnFilePath)) {
      warnings = JSON.parse(fs.readFileSync(warnFilePath));
    }

    if (!warnings[userId] || warnings[userId].length === 0) {
      return interaction.reply({ content: "❌ Ce membre n'a aucun avertissement.", ephemeral: true });
    }

    if (index < 0 || index >= warnings[userId].length) {
      return interaction.reply({ content: `❌ Index invalide. Ce membre a ${warnings[userId].length} avertissement(s).`, ephemeral: true });
    }

    // Retirer l'avertissement
    const removed = warnings[userId].splice(index, 1)[0];
    fs.writeFileSync(warnFilePath, JSON.stringify(warnings, null, 2));

    const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle('✅ Avertissement retiré')
      .setDescription(`Avertissement retiré à ${member.user.tag}.\n**Raison retirée :** ${removed.reason || 'Non spécifiée'}`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });

    // Log dans le salon de logs
    const logChannel = interaction.guild.channels.cache.get(LOG_CHANNEL_ID);
    if (logChannel) logChannel.send({ embeds: [embed] });
  },
};