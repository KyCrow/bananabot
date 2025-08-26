// commands/fun/musique.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const musique = require('../../data/musique.json');

// Petits commentaires RP / bananesques
const commentairesRP = [
    "🍌 Une musique pour te détendre dans la République des Bananes !",
    "🎶 Danse sous les palmiers !",
    "😎 Ambiance tropicale activée !",
    "🥳 Mets le son et profite !",
    "🌴 Vibes bananesques garanties !"
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('musique')
        .setDescription('Donne un lien de musique aléatoire')
        .addStringOption(option =>
            option.setName('categorie')
                .setDescription('Choisis la catégorie de musique')
                .setRequired(false)
                .addChoices(
                    { name: 'Chill', value: 'chill' },
                    { name: 'Party', value: 'party' },
                    { name: 'Bananes', value: 'bananes' },
                    { name: 'Relax', value: 'relax' }
                )),
    async execute(interaction) {
        const categorie = interaction.options.getString('categorie') || 'chill';
        const liste = musique[categorie];

        if (!liste || !liste.length) {
            return interaction.reply('Oups ! Il n’y a pas de musique pour cette catégorie 😅');
        }

        // Tirage aléatoire d’un lien
        const musiqueChoisie = liste[Math.floor(Math.random() * liste.length)];

        // Tirage aléatoire d’un commentaire RP
        const commentaire = commentairesRP[Math.floor(Math.random() * commentairesRP.length)];

        // Embed Discord
        const embed = new EmbedBuilder()
            .setTitle('🎵 Musique du jour')
            .setDescription(`[Écoute ici](${musiqueChoisie})\n\n*${commentaire}*`)
            .setColor('Blue')
            .setFooter({ text: 'République des Bananes - BananaBot' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
