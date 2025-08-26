// commands/fun/blague.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const blagues = require('../../data/blagues.json'); // Chemin vers ton JSON

// Liste de petits commentaires RP / bananesques
const commentairesRP = [
    "🍌 Vive la République des Bananes !",
    "😎 Une banane par jour éloigne la tristesse !",
    "😂 Même les singes approuvent cette blague !",
    "🍍 Un peu d’humour tropical pour toi !",
    "🥳 Rires garantis sous le cocotier !"
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blague')
        .setDescription('Raconte une blague aléatoire')
        .addStringOption(option =>
            option.setName('categorie')
                .setDescription('Choisis la catégorie de la blague')
                .setRequired(false)
                .addChoices(
                    { name: 'Papa', value: 'blagues-de-papa' },
                    { name: 'Noire', value: 'blagues-noires' },
                    { name: 'Animaux', value: 'blagues-animaux' },
                    { name: 'Geek', value: 'blagues-de-geek' },
                    { name: 'Cul', value: 'blagues-de-cul' }
                )),
    async execute(interaction) {
        // Récupère la catégorie ou prend 'blagues-de-papa' par défaut
        const categorie = interaction.options.getString('categorie') || 'blagues-de-papa';
        const liste = blagues[categorie];

        if (!liste || !liste.length) {
            return interaction.reply('Oups ! Il n’y a pas de blague pour cette catégorie 😅');
        }

        // Tirage aléatoire d’une blague
        const blagueChoisie = liste[Math.floor(Math.random() * liste.length)];

        // Tirage aléatoire d’un commentaire RP
        const commentaire = commentairesRP[Math.floor(Math.random() * commentairesRP.length)];

        // Création de l’embed Discord
        const embed = new EmbedBuilder()
            .setTitle('😂 Blague du jour')
            .setDescription(`${blagueChoisie}\n\n*${commentaire}*`)
            .setColor('Yellow')
            .setFooter({ text: 'République des Bananes - BananaBot' })
            .setTimestamp();

        // Envoie de l’embed
        await interaction.reply({ embeds: [embed] });
    },
};
