const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const warnFilePath = './data/warnings.json';
const LOG_CHANNEL_ID = '1315300131695886407';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warnlist')
    .setDescription('📜 Afficher les avertissements d\'un membre.')
    .addUserOption(option =>
      option.setName('membre')
        .setDescription('Le membre dont voir les avertissements')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const member = interaction.options.getMember('membre');
    const userId = member.user.id;
    const logChannel = interaction.guild.channels.cache.get(LOG_CHANNEL_ID);

    // Charger les avertissements
    let warnings = {};
    if (fs.existsSync(warnFilePath)) {
      warnings = JSON.parse(fs.readFileSync(warnFilePath));
    }

    if (!warnings[userId] || warnings[userId].length === 0) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#FFA500')
            .setTitle(`📜 Avertissements de ${member.user.tag}`)
            .setDescription('Aucun avertissement trouvé pour ce membre.')
            .setFooter({ text: `ID : ${userId}` })
            .setTimestamp()
        ]
      });
    }

    const warnLines = warnings[userId]
      .map((warn, index) => `**${index + 1}.** Raison : ${warn.reason} - 📅 ${warn.date}`)
      .join('\n');

    const embed = new EmbedBuilder()
      .setColor('#FFA500')
      .setTitle(`📜 Avertissements de ${member.user.tag}`)
      .setDescription(warnLines)
      .setFooter({ text: `Total : ${warnings[userId].length} • ID : ${userId}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
