const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Renvoie le lien d’invitation du serveur'),
    async execute(interaction) {
        const invite = await interaction.channel.createInvite({ maxAge: 0, maxUses: 0, unique: true });
        interaction.reply(`Voici le lien d’invitation du serveur : ${invite.url}`);
    },
};
