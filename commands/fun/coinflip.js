// commands/fun/coinflip.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Lance une pièce : pile ou face !'),
    async execute(interaction) {
        const resultat = Math.random() < 0.5 ? 'Pile 🍌' : 'Face 🍌';

        // GIF aléatoire pour le lancer
        const gifs = [
            'https://media.giphy.com/media/l41YtZOb9EUABnuqA/giphy.gif'
        ];
        const gifChoisi = gifs[Math.floor(Math.random() * gifs.length)];

        const embed = new EmbedBuilder()
            .setTitle('🪙 Coinflip !')
            .setDescription(`Le résultat est : **${resultat}**`)
            .setImage(gifChoisi)
            .setColor('Yellow')
            .setFooter({ text: 'République des Bananes - BananaBot' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
