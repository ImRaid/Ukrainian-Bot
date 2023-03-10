const discord = require("discord.js")
const { sendLog } = require('../handlers/logger.js');
module.exports = async(client,channel) => {
    try {

    let channeltupe = ''
    if(channel.type === 0) {
   channeltupe = "текстовий"
    }
    if(channel.type === 2) {
    channeltupe = "голосовий" 
    }
    if(channel.type === 13) {
        channeltupe = "Стейдж"
    }
    if(channel.type === 15) {
        channeltupe = "Форум"
    }
    if(channel.type === 5) {
        channeltupe = "Оголошень"
    }
    if(channel.type === 5) {
        channeltupe = "категорія"
    }
    
    let emb17 = new discord.EmbedBuilder()
    .setTitle('**Сповіщення**')
    .setColor('Yellow')
    .addFields({name:`Створено канал:`, value:`${channel.name}`, inline:true},
    {name:`Тип каналу:`, value:`${channeltupe}`, inline:true},
    {name:`ID:`, value:`${channel.id}`, inline:true}
    )
    .setTimestamp();
    sendLog(channel.guild,emb17)
   
} catch(e) {
    console.log(e)
}
}