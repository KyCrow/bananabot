// commands/fun/banane_du_jour.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banane_du_jour')
        .setDescription('Tire la banane chanceuse du jour !'),
    async execute(interaction) {
        // Fetch tous les membres du serveur (nécessite l'intent GuildMembers activé)
        await interaction.guild.members.fetch();

        const membres = interaction.guild.members.cache.filter(m => !m.user.bot);
        const tirage = Array.from(membres.values())[Math.floor(Math.random() * membres.size)];

        const embed = new EmbedBuilder()
            .setTitle('🍌 Banane du jour !')
            .setDescription(`${tirage.user.username} est la banane chanceuse du jour !`)
            .setColor('Yellow')
            .setFooter({ text: 'République des Bananes - BananaBot' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
