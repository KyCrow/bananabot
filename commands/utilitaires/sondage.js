const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sondage')
        .setDescription('Créer un sondage avec plusieurs options et réactions')
        .addStringOption(option => 
            option.setName('question')
                .setDescription('La question du sondage')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('options')
                .setDescription('Sépare les options par des virgules')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('emotes')
                .setDescription('Sépare les émotes par des virgules (ex : 👍,👎,🤷‍♂️)')
                .setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const optionsRaw = interaction.options.getString('options');
        const emotesRaw = interaction.options.getString('emotes');

        const optionsArray = optionsRaw.split(',').map(o => o.trim());
        const emotesArray = emotesRaw.split(',').map(e => e.trim());

        if (optionsArray.length !== emotesArray.length) {
            return interaction.reply('Le nombre d’options doit correspondre au nombre d’émotes !');
        }

        // Création de l'embed
        const embed = new EmbedBuilder()
            .setTitle('📊 Nouveau sondage !')
            .setDescription(`**${question}**\n\n` +
                optionsArray.map((opt, i) => `${emotesArray[i]} ${opt}`).join('\n'))
            .setColor('Blue')
            .setFooter({ text: `Sondage créé par ${interaction.user.tag}` })
            .setTimestamp();

        // Envoi de l'embed
        const message = await interaction.reply({ embeds: [embed], fetchReply: true });

        // Ajout des réactions
        for (const emote of emotesArray) {
            try { await message.react(emote); } catch(e) { console.log(`Impossible de réagir avec ${emote}`); }
        }
    },
};
