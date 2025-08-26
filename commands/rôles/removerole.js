const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removerole')
        .setDescription('Retirer un rôle à un membre')
        .addUserOption(option => option.setName('membre').setDescription('Membre cible').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('Rôle à retirer').setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has('ManageRoles')) return interaction.reply('Tu n’as pas la permission !');
        const membre = interaction.options.getMember('membre');
        const role = interaction.options.getRole('role');
        await membre.roles.remove(role);
        interaction.reply(`${role.name} a été retiré à ${membre.user.tag}`);
    },
};
