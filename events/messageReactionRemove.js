const fs = require('fs');

module.exports = {
    name: 'messageReactionRemove',
    async execute(reaction, user, client) {
        if (user.bot) return;

        const filePath = './data/reactionRoles.json';
        if (!fs.existsSync(filePath)) return;

        const data = JSON.parse(fs.readFileSync(filePath));
        const item = data.find(r => r.messageId === reaction.message.id && r.emoji === reaction.emoji.name);

        if (!item) return;

        try {
            const guild = client.guilds.cache.get(item.guildId);
            const member = guild.members.cache.get(user.id);
            const role = guild.roles.cache.get(item.roleId);
            if (member && role) await member.roles.remove(role);
        } catch (error) {
            console.error('Erreur lors du retrait du rôle par réaction :', error);
        }
    }
};
