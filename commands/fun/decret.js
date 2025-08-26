// commands/fun/decret.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('decret')
        .setDescription('Génère un décret absurde de la République des Bananes'),
    async execute(interaction) {
        const decrets = [
            'Tout citoyen doit manger au moins une banane avant midi 🍌',
            'Chaque vendredi est jour officiel de danse sur les tables 💃',
            'Interdiction de voler les bananes d’autrui sous peine de rire forcé 😆',
            'Tout sourire rapporte 5 points banane !',
            'Chaque citoyen doit raconter une blague par jour'
        ];

        const decret = decrets[Math.floor(Math.random() * decrets.length)];

        const embed = new EmbedBuilder()
            .setTitle('📜 Décret du jour')
            .setDescription(decret)
            .setColor('Yellow')
            .setFooter({ text: 'République des Bananes - BananaBot' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
