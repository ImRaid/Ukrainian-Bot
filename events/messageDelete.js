const discord = require("discord.js")
const { sendLog } = require('../handlers/logger.js');
module.exports = async(client,message) => {
    try{
    if(message.embeds.length === 0) {
    if(message.channel.type == 0){
  
  
        if(message.attachments.size !== 0){
           
            let embed = new discord.EmbedBuilder()
            .setTitle('**Сповіщення**')
            .setDescription(`**Повідомлення видалено!** 🗑️`)
            .setColor("Red")
            .addFields({name:`Автор:`,value:`${message.author}`,inline:true},
                {name:`Канал:`,value:`${message.channel}`,inline:true},
                {name:`Повідомлення:`,value:`${message.cleanContent}`,inline:true},
             
                )
            .setImage(message.attachments.first().url)
            sendLog(message.guild,embed)
            
        }else{
            let embed = new discord.EmbedBuilder()
            .setTitle('**Сповіщення**')
            .setDescription(`**Повідомлення видалено!** 🗑️`)
            .setColor("Red")
            .addFields(
                {name:`Автор:`,value:`${message.author}`},
                {name:`Канал:`,value:`${message.channel}`},
                {name:`Повідомлення:`,value:`${message.cleanContent}`},
             
                )
    
            sendLog(message.guild,embed)
    }
 

    }
}
    }catch(e){

    }
}
