const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Affiche le ping du bot'),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const ping = Math.round(interaction.client.ws.ping);

        const embed = new EmbedBuilder()
            .setTitle('🏓 Pong !')
            .setDescription(`Ping du bot : ${ping} ms`)
            .setColor('Blue')
            .setTimestamp();

        interaction.editReply({ embeds: [embed] });
    }
};
