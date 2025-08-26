const fs = require('fs');
const path = require('path');
const xpFilePath = path.join(__dirname, '../data/xp.json');
const coinsFilePath = path.join(__dirname, '../data/coin.json');
const CHANNEL_ID = '1317910144943915049';
const countPath = path.join(__dirname, '..', 'data', 'count.json');

function loadCount() {
    if (!fs.existsSync(countPath)) {
        fs.writeFileSync(countPath, JSON.stringify({ lastNumber: 0 }, null, 2));
    }
    return JSON.parse(fs.readFileSync(countPath, 'utf8'));
}

function saveCount(number) {
    fs.writeFileSync(countPath, JSON.stringify({ lastNumber: number }, null, 2));
}

let { lastNumber } = loadCount();

module.exports = async (message) => {
    if (message.author.bot) return;
    if (message.channel.id !== CHANNEL_ID) return;

    const number = parseInt(message.content);

    if (isNaN(number)) {
        await message.delete().catch(() => {});
        return;
    }

    if (number === lastNumber + 1) {
        lastNumber = number;
        saveCount(lastNumber);
        await message.react('✅').catch(() => {});
    } else {
        await message.delete().catch(() => {});
    }
};

module.exports = {
  name: 'messageCreate',

  async execute(message) {
    if (message.author.bot || !message.guild) return;

    // XP
    let xpData = {};
    if (fs.existsSync(xpFilePath)) {
      xpData = JSON.parse(fs.readFileSync(xpFilePath, 'utf-8'));
    }
    const guildId = message.guild.id;
    const userId = message.author.id;
    if (!xpData[guildId]) xpData[guildId] = {};
    if (!xpData[guildId][userId]) xpData[guildId][userId] = { xp: 0 };

    // Level up logic (comme avant)
    const getLevel = (xp) => Math.floor(0.1 * Math.sqrt(xp));
    const oldXp = xpData[guildId][userId].xp;
    const oldLevel = getLevel(oldXp);
    const randomXp = Math.floor(Math.random() * 11) + 5;
    xpData[guildId][userId].xp += randomXp;
    const newXp = xpData[guildId][userId].xp;
    const newLevel = getLevel(newXp);
    fs.writeFileSync(xpFilePath, JSON.stringify(xpData, null, 2));
    if (newLevel > oldLevel) {
      message.channel.send(`🎉 Bravo ${message.author}, tu passes niveau ${newLevel} !`);
    }

    // COINS
    let coinsData = {};
    if (fs.existsSync(coinsFilePath)) {
      coinsData = JSON.parse(fs.readFileSync(coinsFilePath, 'utf-8'));
    }
    if (!coinsData[guildId]) coinsData[guildId] = {};
    if (!coinsData[guildId][userId]) coinsData[guildId][userId] = { coins: 0 };

    // Ajoute des pièces (exemple : 2 pièces par message)
    coinsData[guildId][userId].coins += 2;
    fs.writeFileSync(coinsFilePath, JSON.stringify(coinsData, null, 2));
  }
};
