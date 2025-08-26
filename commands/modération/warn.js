const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const fs = require('fs').promises;
const path = require('path');
const warnFilePath = path.join(__dirname, '../../data/warnings.json');
const LOG_CHANNEL_ID = '1315300131695886407'; // Remplacez par l'ID de ton salon de logs

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('⚠️ Avertir un membre.')
    .addUserOption(option =>
      option.setName('membre')
        .setDescription('Le membre à avertir')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('raison')
        .setDescription('La raison de l\'avertissement')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const member = interaction.options.getMember('membre');
    const reason = interaction.options.getString('raison');
    const userId = member.user.id;
    const logChannel = interaction.guild.channels.cache.get(LOG_CHANNEL_ID);

    if (!logChannel) {
      return interaction.reply('❌ Le salon de logs n\'est pas disponible.');
    }

    let warnings = {};
    try {
      const data = await fs.readFile(warnFilePath, 'utf8');
      warnings = JSON.parse(data);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        console.error('Erreur lors du chargement des avertissements :', err);
        return interaction.reply('❌ Une erreur est survenue lors du chargement des avertissements.');
      }
    }

    if (!warnings[userId]) warnings[userId] = [];
    warnings[userId].push({ reason, date: new Date().toISOString() });

    try {
      await fs.writeFile(warnFilePath, JSON.stringify(warnings, null, 2));
    } catch (err) {
      console.error('Erreur lors de la sauvegarde des avertissements :', err);
      return interaction.reply('❌ Une erreur est survenue lors de la sauvegarde des avertissements.');
    }

    const warnEmbed = new EmbedBuilder()
      .setColor('#FF9C00')
      .setTitle('⚠️ Avertissement')
      .setDescription(`**Membre** : ${member.user.tag}\n**Avertissement par** : ${interaction.user.tag}\n**Raison** : ${reason}`)
      .addFields(
        { name: 'Date', value: new Date().toLocaleString(), inline: true },
      )
      .setTimestamp()
      .setFooter({ text: `ID de l'utilisateur : ${userId}`, iconURL: member.user.displayAvatarURL() });

    try {
      await logChannel.send({ embeds: [warnEmbed] });
    } catch (err) {
      console.error('Erreur lors de l\'envoi du log :', err);
      return interaction.reply('❌ Une erreur est survenue lors de l\'envoi du log.');
    }

    await interaction.reply(`✅ ${member.user.tag} a été averti pour : ${reason}`);
  },
};
