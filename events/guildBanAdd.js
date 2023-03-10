const discord = require("discord.js")
const { sendLog } = require('../handlers/logger.js');
module.exports = async(client,member) => {
        
    let emb17 = new discord.EmbedBuilder()
    .setTitle('**Сповіщення**')
    .setTitle(`**Користувача заблоковано!**`)
    .setColor('Yellow')
    .addFields(
    {name:`Ім'я:`, value:`${member.user.username}`, inline:true},
    {name:`ID:`, value:`${member.user.id}`, inline:true},
    )
    .setTimestamp();
    sendLog(channel.guild,emb17)
   
}
   