const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Faire une suggestion')
        .addStringOption(option => option.setName('texte').setDescription('Votre suggestion').setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const texte = interaction.options.getString('texte');
        const embed = new EmbedBuilder()
            .setTitle('💡 Nouvelle suggestion')
            .setDescription(texte)
            .setColor('Yellow')
            .setFooter({ text: `Suggestion de ${interaction.user.tag}` })
            .setTimestamp();

        const channel = interaction.guild.channels.cache.get('ID_DU_CHANNEL_SUGGESTIONS');
        if (!channel) return interaction.editReply('Salon suggestions introuvable.');

        await channel.send({ embeds: [embed] });
        interaction.editReply('✅ Suggestion envoyée !');
    }
};
