const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Chemin vers le fichier contenant les données d'XP
const xpPath = path.join(__dirname, '../../data/xp.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription("🏆 Affiche le classement XP du serveur"),

  async execute(interaction) {
    // Lis le fichier à CHAQUE exécution
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

    // Vérifie si des données d'XP existent pour ce serveur
    if (!xpData[guildId]) {
      return await interaction.reply({ content: "Aucune donnée d'XP pour ce serveur.", ephemeral: true });
    }

    const guildXP = xpData[guildId];

    // Convertit les données en tableau avec id, xp et niveau
    const leaderboard = Object.entries(guildXP)
      .map(([id, data]) => {
        const xp = data.xp || 0;
        const level = Math.floor(0.1 * Math.sqrt(xp));
        return { id, xp, level };
      })
      .sort((a, b) => b.xp - a.xp); // Classe par XP décroissant

    // Récupère la position et les données de l'utilisateur qui utilise la commande
    const userRank = leaderboard.findIndex(u => u.id === userId) + 1;
    const userData = leaderboard.find(u => u.id === userId);

    const userDisplay = userData
      ? `🎯 Tu es **#${userRank}** avec **${userData.xp} XP** (Niveau ${userData.level})`
      : "Tu n'es pas encore classé ! Envoie des messages pour gagner de l'XP !";

    // Sélectionne les 20 premiers du classement
    const top = leaderboard.slice(0, 20);

    // Formatage du leaderboard avec les noms sans mention réelle
    const lines = await Promise.all(top.map(async (user, index) => {
      try {
        const member = await interaction.guild.members.fetch(user.id);
        return `**${index + 1}.** \`@${member.displayName}\` : Niveau ${user.level} - ${user.xp} XP`;
      } catch {
        return `**${index + 1}.** \`@Inconnu\` : Niveau ${user.level} - ${user.xp} XP`;
      }
    }));

    // Création de l'embed final
    const embed = new EmbedBuilder()
      .setTitle(`🏆 Leaderboard du serveur`)
      .setColor(0xFFD700) // Doré
      .setDescription(`${userDisplay}\n\n${lines.join('\n')}`)
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setFooter({ text: 'Top 20 membres avec le plus d\'XP' });

    // Envoie l'embed en réponse
    await interaction.reply({ embeds: [embed] });
  }
};
