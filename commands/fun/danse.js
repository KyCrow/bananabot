// commands/fun/danse.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch'); // npm i node-fetch@2 pour require classique

const GIPHY_API_KEY = 'q6U7TfHaEXO9kTe4EPjwiHtudFfGRFvP'; // ta clé API

module.exports = {
    data: new SlashCommandBuilder()
        .setName('danse')
        .setDescription('Envoie un GIF de danse aléatoire depuis Giphy'),
    async execute(interaction) {
        try {
            // Recherche des GIFs "dance" sur Giphy
            const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=dance&limit=50&rating=g`;
            const response = await fetch(url);
            const data = await response.json();

            if (!data.data.length) return interaction.reply('Impossible de trouver un GIF 😅');

            // Tirage aléatoire d'un GIF
            const gif = data.data[Math.floor(Math.random() * data.data.length)].images.original.url;

            const embed = new EmbedBuilder()
                .setTitle('💃 Danse du jour !')
                .setImage(gif)
                .setColor('Yellow')
                .setFooter({ text: 'République des Bananes - BananaBot' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            interaction.reply('Oups ! Impossible de récupérer un GIF 😅');
        }
    },
};
