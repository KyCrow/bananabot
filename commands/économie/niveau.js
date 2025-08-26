const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const xpPath = path.join(__dirname, '../../data/xp.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('niveau') // Nom de la commande
    .setDescription("📊 Affiche ton niveau et ton XP sur le serveur"), // Description

  async execute(interaction) {
    // Lis le fichier XP à CHAQUE exécution
    let xpData = {};
    if (fs.existsSync(xpPath)) {
      try {
        xpData = JSON.parse(fs.readFileSync(xpPath, 'utf-8'));
      } catch {
        xpData = {};
      }
    }

    const userId = interaction.user.id;
    const guildId = interaction.guild.id;

    // Vérifie si le serveur est enregistré
    if (!xpData[guildId]) xpData[guildId] = {};
    // Vérifie si l'utilisateur est enregistré
    if (!xpData[guildId][userId]) {
      xpData[guildId][userId] = { xp: 0 };
      // Sauvegarde si nouvel utilisateur
      fs.writeFileSync(xpPath, JSON.stringify(xpData, null, 2));
    }

    const xp = xpData[guildId][userId].xp;

    // Fonction de calcul de niveau
    const getLevel = (xp) => Math.floor(0.1 * Math.sqrt(xp));
    const getXPForNextLevel = (level) => Math.pow((level + 1) / 0.1, 2);

    const level = getLevel(xp);
    const xpForNextLevel = getXPForNextLevel(level);
    const xpForCurrentLevel = getXPForNextLevel(level - 1);
    const currentLevelProgress = xp - xpForCurrentLevel;
    const totalLevelXP = xpForNextLevel - xpForCurrentLevel;

    const progressBarLength = 20;
    const filledBars = Math.round((currentLevelProgress / totalLevelXP) * progressBarLength);
    const emptyBars = progressBarLength - filledBars;
    const progressBar = '🟦'.repeat(filledBars) + '⬛'.repeat(emptyBars);

    // Création de l'embed
    const embed = new EmbedBuilder()
      .setColor(0x0099FF) // Couleur de l'embed
      .setTitle(`📊 Niveau de ${interaction.user.username}`)
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true })) // Avatar
      .addFields(
        { name: 'XP', value: `${xp} XP`, inline: true },
        { name: 'Niveau', value: `${level}`, inline: true },
        { name: 'Progression', value: `${progressBar} (${currentLevelProgress}/${totalLevelXP})` }
      )
      .setFooter({ text: `Continue à participer pour gagner de l'XP !` });

    await interaction.reply({ embeds: [embed] });
  }
};
