const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('servericon')
        .setDescription('Affiche l’icône du serveur'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle(`Icône de ${interaction.guild.name}`)
            .setImage(interaction.guild.iconURL({ dynamic: true, size: 1024 }))
            .setColor('Blue');
        interaction.reply({ embeds: [embed] });
    }
};
