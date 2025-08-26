const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const xpFilePath = path.join(__dirname, '../../data/xp.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removexp')
    .setDescription('❌ Retirer de l\'XP à un utilisateur.')
    .addUserOption(option =>
      option.setName('utilisateur')
        .setDescription('L\'utilisateur auquel retirer de l\'XP')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('xp')
        .setDescription('Le montant d\'XP à retirer')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const user = interaction.options.getUser('utilisateur');
    const xpAmount = interaction.options.getInteger('xp');
    const userId = user.id;
    const guildId = interaction.guild.id;

    let xpData = {};

    // Charger les données d'XP
    if (fs.existsSync(xpFilePath)) {
      xpData = JSON.parse(fs.readFileSync(xpFilePath));
    }

    // Initialiser la structure si besoin
    if (!xpData[guildId]) xpData[guildId] = {};
    if (!xpData[guildId][userId]) xpData[guildId][userId] = { xp: 0 };

    // Retirer l'XP par le montant spécifié
    xpData[guildId][userId].xp -= xpAmount;

    // Ne pas autoriser l'XP à devenir négatif
    if (xpData[guildId][userId].xp < 0) {
      xpData[guildId][userId].xp = 0;
    }

    // Sauvegarder les données dans le fichier JSON
    fs.writeFileSync(xpFilePath, JSON.stringify(xpData, null, 2));

    // Répondre à l'utilisateur
    await interaction.reply(`❌ ${xpAmount} XP ont été retirés à ${user.tag}.`);
  },
};
