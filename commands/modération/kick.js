const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Expulse un membre du serveur')
        .addUserOption(option => option.setName('membre').setDescription('Membre à expulser').setRequired(true))
        .addStringOption(option => option.setName('raison').setDescription('Raison du kick').setRequired(false)),
    async execute(interaction) {
        if (!interaction.member.permissions.has('KickMembers')) return interaction.reply('Tu n’as pas la permission !');

        const membre = interaction.options.getUser('membre');
        const raison = interaction.options.getString('raison') || 'Aucune raison fournie';

        try {
            const membreGuild = await interaction.guild.members.fetch(membre.id);
            await membreGuild.kick(raison);
            await interaction.reply(`${membre.tag} a été expulsé ! Raison : ${raison}`);
        } catch (error) {
            console.error(error);
            interaction.reply('Impossible d’expulser ce membre.');
        }
    }
};
