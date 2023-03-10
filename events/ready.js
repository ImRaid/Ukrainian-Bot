const { YouTubeCheck } = require('../handlers/YouTubeCheck.js')
const { AlertsCheck } = require('../handlers/alertsCheck.js')
const { ActivityType } = require('discord.js');
module.exports = async (client) => {
    client.colorred = 'ff1100';
    client.colorgreen = '00ff09';
    client.color = '2f3136';

    setInterval(() => {
        client.user.setPresence({
            activities: [{ name: `${client.guilds.cache.size} | ua! допомога`, type: ActivityType.Watching }],
            status: 'idle',
        });
    }, 15000)
    console.log(`${client.user.tag} загружено на сервер`)
    setInterval(()  => YouTubeCheck(client), 60*1000)
    setInterval(() => AlertsCheck(client), 5*1000)
};