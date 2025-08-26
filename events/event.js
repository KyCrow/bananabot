const fs = require('fs');
const path = require('path');
// Assure-toi que 'client' est bien importé ou passé à ce fichier

module.exports = (client) => {
  const eventsPath = path.join(__dirname);
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js') && file !== 'event.js');

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }
};

module.exports = {
    name: 'messageReactionAdd',
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
            if (member && role) await member.roles.add(role);
        } catch (error) {
            console.error('Erreur lors de l’ajout du rôle par réaction :', error);
        }
    }
};