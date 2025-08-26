const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const quotes = require('../../data/quotes.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('citation')
        .setDescription('Donne une citation aléatoire'),
    async execute(interaction) {
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        const embed = new EmbedBuilder()
            .setTitle('💬 Citation du jour')
            .setDescription(quote)
            .setColor('Purple');
        interaction.reply({ embeds: [embed] });
    }
};
