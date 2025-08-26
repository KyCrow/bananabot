const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Ajouter un rôle à un membre')
        .addUserOption(option => option.setName('membre').setDescription('Membre cible').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('Rôle à ajouter').setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getUser('membre');
        const role = interaction.options.getRole('role');

        if (!interaction.member.permissions.has('ManageRoles'))
            return interaction.reply({ content: 'Tu n’as pas la permission !', ephemeral: true });

        try {
            const membre = await interaction.guild.members.fetch(user.id);

            if (role.position >= interaction.guild.members.me.roles.highest.position)
                return interaction.reply({ content: 'Je ne peux pas attribuer ce rôle, il est trop haut dans la hiérarchie.', ephemeral: true });

            await membre.roles.add(role);
            interaction.reply({ content: `${role.name} a été ajouté à ${membre.user.tag}`, ephemeral: false });
        } catch (err) {
            console.error(err);
            interaction.reply({ content: 'Impossible d’ajouter ce rôle.', ephemeral: true });
        }
    }
};
