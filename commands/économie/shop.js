const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shop')
    .setDescription('Affiche la boutique du serveur.'),

  async execute(interaction) {
    // Exemple d'items, tu pourras les modifier plus tard
    const items = [
      { name: '🆙 10 XP', price: 50, description: 'Achète 10 XP.' }
    ];

    const embed = new EmbedBuilder()
      .setTitle('🛒 Boutique du serveur')
      .setColor(0x00AE86)
      .setDescription(items.map(item =>
        `**${item.name}**\nPrix : \`${item.price}\` pièces\n${item.description}\n`
      ).join('\n'))
      .setFooter({ text: 'Ouvre un ticket pour acheter !' });

    await interaction.reply({ embeds: [embed] });
  }
};