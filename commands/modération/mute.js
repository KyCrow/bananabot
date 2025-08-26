const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Rend muet un membre')
        .addUserOption(option => option.setName('membre').setDescription('Membre à mute').setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has('MuteMembers')) 
            return interaction.reply('Tu n’as pas la permission !');

        const membre = await interaction.guild.members.fetch(interaction.options.getUser('membre').id);

        const muteRoleId = '1315351711031885855';
        const muteRole = interaction.guild.roles.cache.get(muteRoleId);

        if (!muteRole) return interaction.reply('Le rôle Muted n’existe pas !');

        await membre.roles.add(muteRole);
        interaction.reply(`${membre.user.tag} a été rendu muet !`);
    },
};
