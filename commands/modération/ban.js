const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bannit un membre du serveur')
        .addUserOption(option => option.setName('membre').setDescription('Membre à bannir').setRequired(true))
        .addStringOption(option => option.setName('raison').setDescription('Raison du ban').setRequired(false)),
    async execute(interaction) {
        if (!interaction.member.permissions.has('BanMembers')) return interaction.reply('Tu n’as pas la permission !');

        const membre = interaction.options.getUser('membre');
        const raison = interaction.options.getString('raison') || 'Aucune raison fournie';

        try {
            const membreGuild = await interaction.guild.members.fetch(membre.id);
            await membreGuild.ban({ reason: raison });
            await interaction.reply(`${membre.tag} a été banni ! Raison : ${raison}`);
        } catch (error) {
            console.error(error);
            interaction.reply('Impossible de bannir ce membre.');
        }
    }
};
