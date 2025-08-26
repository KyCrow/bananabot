// commands/fun/citoyen.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('citoyen')
        .setDescription('Affiche le profil RP d’un citoyen de la République des Bananes.')
        .addUserOption(option =>
            option.setName('membre')
                  .setDescription('Le membre à profiler')
                  .setRequired(false)),
    async execute(interaction) {
        const membre = interaction.options.getUser('membre') || interaction.user;

        // Génération aléatoire des stats RP
        const grades = ['Citoyen', 'Ministre', 'Président', 'Banana Knight', 'Clown officiel'];
        const gradeChoisi = grades[Math.floor(Math.random() * grades.length)];

        const pointsBanane = Math.floor(Math.random() * 1000);
        const reputation = Math.floor(Math.random() * 100);

        // Décrets personnels aléatoires
        const decretPerso = [
            'Toujours prêt à distribuer du potassium !',
            'Interdit de voler des bananes le mardi.',
            'Ma banane est sacrée, respecte-la.',
            'Champion du lancer de peau de banane.',
            'Décret secret : chaque sourire rapporte 5 points banane.',
            'Interdiction de dormir avant d’avoir mangé une banane.',
            'Chaque citoyen doit raconter une blague par jour.',
            'Proclamation : danser sur la table est un devoir national.'
        ];
        const decretChoisi = decretPerso[Math.floor(Math.random() * decretPerso.length)];

        const embed = new EmbedBuilder()
            .setTitle(`Profil citoyen de ${membre.username}`)
            .setThumbnail(membre.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Grade', value: gradeChoisi, inline: true },
                { name: 'Points Banane', value: `${pointsBanane} 🍌`, inline: true },
                { name: 'Réputation', value: `${reputation}/100`, inline: true },
                { name: 'Décret personnel', value: decretChoisi }
            )
            .setColor('Yellow')
            .setFooter({ text: 'République des Bananes - BananaBot' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
