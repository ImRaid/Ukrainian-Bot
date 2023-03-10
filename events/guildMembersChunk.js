const discord = require("discord.js")
const { sendLog } = require('../handlers/logger.js');
module.exports = async(client,members) => {
    let emb9 = new discord.EmbedBuilder()
    .setTitle('**Сповіщення**')
    .setColor('Green')
    .setDescription(`**Рейд!**`)
    .addFields({name:`Рейд:`,  value: `${members.length} учасники`, inline:true})
    sendLog(members.guild,emb9)
}