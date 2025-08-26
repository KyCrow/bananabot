// commands/fun/insulte_amicale.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('insulteamicale')
        .setDescription('Envoie une insulte drôle et amicale à un membre')
        .addUserOption(option =>
            option.setName('membre')
                  .setDescription('Le membre ciblé')
                  .setRequired(false)),
    async execute(interaction) {
        const membre = interaction.options.getUser('membre') || interaction.user;

        const insultes = [
            'Oh toi, tu es aussi utile qu’une banane sans potassium 🍌',
            'Tu es tellement lent qu’une limace te dépasse en course !',
            'T’as le charisme d’une peau de banane 🫣',
            'Ta logique est aussi tordue qu’un spaghetti 🍝',
            'Tu ressembles à une banane oubliée sur le comptoir 😜'
        ];

        const insulte = insultes[Math.floor(Math.random() * insultes.length)];

        const embed = new EmbedBuilder()
            .setTitle(`💛 Insulte amicale pour ${membre.username}`)
            .setDescription(insulte)
            .setColor('Yellow')
            .setFooter({ text: 'République des Bananes - BananaBot' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
