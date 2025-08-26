const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('youtube')
        .setDescription('Lien vers la chaîne YouTube'),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const embed = new EmbedBuilder()
            .setTitle('📺 Ma chaîne YouTube')
            .setDescription('[Clique ici pour visiter ma chaîne](https://www.youtube.com/channel/TON_ID)')
            .setColor('Red')
            .setTimestamp();

        interaction.editReply({ embeds: [embed] });
    }
};
