const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const commands = require('../../data/commands.json'); // <-- on lit le JSON ici

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Affiche les commandes par catégorie'),

    async execute(interaction) {
        // defer pour prévenir Discord
        await interaction.deferReply({ ephemeral: true });

        // Embed initial
        const embed = new EmbedBuilder()
            .setTitle('📚 Menu d’aide')
            .setDescription('Sélectionne une catégorie pour voir les commandes')
            .setColor('Yellow');

        // Menu déroulant
        const menu = new StringSelectMenuBuilder()
            .setCustomId('help_select')
            .setPlaceholder('Sélectionne une catégorie')
            .addOptions([
                { label: 'Fun', value: 'fun' },
                { label: 'Modération', value: 'moderation' },
                { label: 'Utilitaires', value: 'utils' }
            ]);

        const row = new ActionRowBuilder().addComponents(menu);

        // Envoi de l'embed initial
        const reply = await interaction.editReply({ embeds: [embed], components: [row] });

        // Collector
        const filter = i => i.user.id === interaction.user.id;
        const collector = reply.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            const category = i.values[0];

            // Vérifie que la catégorie existe dans le JSON
            if (!commands[category]) {
                return i.update({ content: 'Catégorie introuvable', embeds: [], components: [] });
            }

            // Crée l'embed avec les commandes de cette catégorie
            const embedCat = new EmbedBuilder()
                .setTitle(`📌 Commandes ${category.charAt(0).toUpperCase() + category.slice(1)}`)
                .setColor('Green');

            // Construire les champs depuis le JSON
            const fields = commands[category].map(cmd => ({
                name: cmd.name || 'Sans nom',
                value: cmd.description || 'Pas de description',
                inline: false
            }));

            embedCat.addFields(fields);

            await i.update({ embeds: [embedCat], components: [] });
        });
    }
};
