const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const coinsPath = path.join(__dirname, '../../data/coin.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removecoins')
    .setDescription('Retire des pièces à un membre.')
    .addUserOption(option =>
      option.setName('membre')
        .setDescription('Le membre à débiter')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('montant')
        .setDescription('Nombre de pièces à retirer')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const member = interaction.options.getMember('membre');
    const amount = interaction.options.getInteger('montant');
    const guildId = interaction.guild.id;
    const userId = member.user.id;

    if (amount < 1) {
      return interaction.reply({ content: "Le montant doit être supérieur à 0.", ephemeral: true });
    }

    let coinsData = {};
    if (fs.existsSync(coinsPath)) {
      coinsData = JSON.parse(fs.readFileSync(coinsPath, 'utf-8'));
    }
    if (!coinsData[guildId]) coinsData[guildId] = {};
    if (!coinsData[guildId][userId]) coinsData[guildId][userId] = { coins: 0 };

    coinsData[guildId][userId].coins = Math.max(0, coinsData[guildId][userId].coins - amount);
    fs.writeFileSync(coinsPath, JSON.stringify(coinsData, null, 2));

    await interaction.reply({ content: `✅ ${amount} pièces retirées à ${member.user.tag}.` });
  }
};