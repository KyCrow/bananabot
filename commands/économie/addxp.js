const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Fichier de stockage des XP
const xpPath = path.join(__dirname, '../../data/xp.json');
let xpData = {};
if (fs.existsSync(xpPath)) {
  xpData = require(xpPath);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addxp')
    .setDescription("🆙 Ajoute de l'XP à un membre (réservé aux admins)")
    .addUserOption(option =>
      option.setName('membre')
        .setDescription("Le membre à qui donner de l'XP")
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('quantité')
        .setDescription("Quantité d'XP à ajouter")
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const member = interaction.options.getUser('membre');
    const amount = interaction.options.getInteger('quantité');
    const guildId = interaction.guild.id;

    if (amount <= 0) {
      return interaction.reply({ content: "Tu ne peux pas ajouter une valeur négative ou nulle d'XP.", ephemeral: true });
    }

    if (!xpData[guildId]) {
      xpData[guildId] = {};
    }

    if (!xpData[guildId][member.id]) {
      xpData[guildId][member.id] = { xp: 0 };
    }

    xpData[guildId][member.id].xp += amount;

    fs.writeFileSync(xpPath, JSON.stringify(xpData, null, 2));

    await interaction.reply(`✅ Tu as ajouté **${amount} XP** à \`@${member.username}\`.`);
  }
};
