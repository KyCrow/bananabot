// commands/fun/meme.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Envoie un mème aléatoire depuis Reddit !'),
    async execute(interaction) {
        const fetch = await import('node-fetch').then(mod => mod.default);

        try {
            const subreddit = 'memes';
            const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=50`;
            const response = await fetch(url);
            const data = await response.json();

            const posts = data.data.children.filter(post => post.data.post_hint === 'image');
            if (!posts.length) return interaction.reply('Aucun meme trouvé 😅');

            const post = posts[Math.floor(Math.random() * posts.length)];

            const embed = new EmbedBuilder()
                .setTitle(post.data.title)
                .setURL(`https://reddit.com${post.data.permalink}`)
                .setImage(post.data.url)
                .setColor('Yellow')
                .setFooter({ text: `Subreddit: r/${subreddit} - République des Bananes` })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            interaction.reply('Oups ! Impossible de récupérer un meme 😅');
        }
    },
};
