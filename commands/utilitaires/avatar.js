const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Affiche l’avatar d’un membre')
        .addUserOption(option => option.setName('membre').setDescription('Membre à afficher').setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('membre') || interaction.user;
        const embed = new EmbedBuilder()
            .setTitle(`${user.tag} - Avatar`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor('Purple');
        interaction.reply({ embeds: [embed] });
    },
};
