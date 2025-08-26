// commands/fun/hug.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

const GIPHY_API_KEY = 'q6U7TfHaEXO9kTe4EPjwiHtudFfGRFvP';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription('Envoie un câlin à un membre')
        .addUserOption(option =>
            option.setName('membre')
                  .setDescription('Le membre à câliner')
                  .setRequired(true)),
    async execute(interaction) {
        const membre = interaction.options.getUser('membre');

        try {
            const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=hug&limit=50&rating=g`;
            const response = await fetch(url);
            const data = await response.json();

            if (!data.data.length) return interaction.reply('Impossible de trouver un GIF 😅');

            const gif = data.data[Math.floor(Math.random() * data.data.length)].images.original.url;

            const embed = new EmbedBuilder()
                .setTitle(`${interaction.user.username} envoie un câlin à ${membre.username} 💛`)
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
