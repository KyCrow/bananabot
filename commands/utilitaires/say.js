const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Faire dire quelque chose au bot')
        .addStringOption(option => option.setName('texte').setDescription('Message à dire').setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has('ManageMessages')) return interaction.reply('Tu n’as pas la permission !');
        const texte = interaction.options.getString('texte');
        interaction.reply({ content: texte });
    },
};
