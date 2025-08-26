const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const coinsPath = path.join(__dirname, '../../data/coin.json'); 

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription("💰 Affiche ton solde de pièces"),

  async execute(interaction) {
    let coinsData = {};
    if (fs.existsSync(coinsPath)) {
      coinsData = JSON.parse(fs.readFileSync(coinsPath, 'utf-8'));
    }
    const userId = interaction.user.id;
    const guildId = interaction.guild.id;
    const coins = coinsData[guildId]?.[userId]?.coins || 0;

    await interaction.reply({ content: `Tu as ${coins} pièces !` });
  }
};