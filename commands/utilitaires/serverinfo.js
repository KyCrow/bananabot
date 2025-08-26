const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfos')
        .setDescription('Affiche les informations du serveur'),
    async execute(interaction) {
        const guild = interaction.guild;
        const embed = new EmbedBuilder()
            .setTitle(`Infos sur ${guild.name}`)
            .addFields(
                { name: 'ID', value: guild.id, inline: true },
                { name: 'Membres', value: guild.memberCount.toString(), inline: true },
                { name: 'Rôles', value: guild.roles.cache.size.toString(), inline: true },
                { name: 'Salons', value: guild.channels.cache.size.toString(), inline: true },
                { name: 'Boosts', value: guild.premiumSubscriptionCount.toString(), inline: true },
                { name: 'Date de création', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: true }
            )
            .setColor('Blue')
            .setThumbnail(guild.iconURL({ dynamic: true }));
        interaction.reply({ embeds: [embed] });
    },
};
