// commands/fun/8ball.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Pose une question et laisse BananaBot prédire la réponse !')
        .addStringOption(option =>
            option.setName('question')
                  .setDescription('Ta question à poser à la boule magique')
                  .setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');

        // Liste enrichie de réponses
        const reponses = [
            'Oui 🍌',
            'Non 🍌',
            'Peut-être… mais mange d’abord une banane',
            'Absolument !',
            'Jamais de la vie !',
            'Je ne peux pas te le dire maintenant',
            'Demande à nouveau après une sieste',
            'Certainement… ou pas',
            'La réponse est cachée sous la peau de banane',
            'Fais confiance à ton instinct',
            'Tout est possible sous l’œil de la République des Bananes',
            'BananaBot dit : oui, mais avec prudence',
            'Non, et vérifie tes bananes avant',
            'Le destin est incertain, comme une banane mûre',
            'Oui, et n’oublie pas de sourire 🍌',
            'Non, tu dois encore éplucher tes idées',
            'Demande à nouveau demain',
            'La réponse est… peut-être… ou pas',
            'Abandonne, ou consulte un ministre banane',
            'Oui, mais avec style',
            'Non, sauf si tu as une banane magique',
            'Le destin sourit aux courageux',
            'Impossible… pour l’instant',
            'Oui ! Et distribue des points banane',
            'Non… mais au moins tu as essayé',
            'Fais un sacrifice de banane et réessaie',
            'Tout dépend de la couleur de ta banane',
            'Oui, selon les lois de la République des Bananes',
            'Non, la banane a parlé',
            'La réponse est dans ton cœur… et dans ta banane'
        ];

        const reponseChoisie = reponses[Math.floor(Math.random() * reponses.length)];

        // GIF de boule magique
        const bouleGif = 'https://i.redd.it/ybazlzs9uyeb1.gif';

        const embed = new EmbedBuilder()
            .setTitle('🎱 La boule magique répond…')
            .setDescription(reponseChoisie)
            .addFields({ name: 'Question', value: question })
            .setImage(bouleGif)
            .setColor('Yellow')
            .setFooter({ text: 'République des Bananes - BananaBot' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
