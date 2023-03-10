const discord = require("discord.js")
const { sendLog } = require('../handlers/logger.js');
module.exports = async(client,member) => {
    member.guild.fetchAuditLogs({
        type: discord.AuditLogEvent.MemberBanAdd
    }).then(async audit=>{
        const { executor } =  audit.entries.first();
//    
    let emb17 = new discord.EmbedBuilder()
    .setTitle('**Сповіщення**')
    .setTitle(`**Користувача заблоковано!**`)
    .setColor('Yellow')
    .addFields(
    {name:`Ім'я:`, value:`${member.user.username} (<#${member.user.id}>)`, inline:true},
    {name:`ID:`, value:`${member.user.id}`, inline:true},
    {name:`Модератор:`, value:`${executor.tag}`, inline:true}
    )
    .setTimestamp();
    sendLog(channel.guild,emb17)
    })
}
   