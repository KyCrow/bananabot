const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Fichier de stockage des soldes
const coinsPath = path.join(__dirname, '../../data/coin.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Récupère ta récompense quotidienne de 10 pièces.'),

  async execute(interaction) {
    let coinsData = {};
    if (fs.existsSync(coinsPath)) {
      coinsData = JSON.parse(fs.readFileSync(coinsPath, 'utf-8'));
    }

    const userId = interaction.user.id;
    const guildId = interaction.guild.id;
    const now = Date.now();

    if (!coinsData[guildId]) coinsData[guildId] = {};
    if (!coinsData[guildId][userId]) {
      coinsData[guildId][userId] = { coins: 0, lastDaily: 0 };
    }

    const lastDaily = coinsData[guildId][userId].lastDaily || 0;
    const oneDay = 24 * 60 * 60 * 1000;

    if (now - lastDaily < oneDay) {
      const timeLeft = oneDay - (now - lastDaily);
      const hours = Math.floor(timeLeft / (60 * 60 * 1000));
      const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
      return interaction.reply(`⏳ Tu as déjà récupéré ta récompense aujourd'hui ! Reviens dans ${hours}h ${minutes}min.`);
    }

    coinsData[guildId][userId].coins += 10;
    coinsData[guildId][userId].lastDaily = now;

    fs.writeFileSync(coinsPath, JSON.stringify(coinsData, null, 2));

    await interaction.reply('🎁 Tu as reçu **10 pièces** pour ta récompense quotidienne !');
  }
};