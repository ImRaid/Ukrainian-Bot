const discord = require("discord.js")
const { sendLog } = require('../handlers/logger.js');
module.exports = async(client,oldMessage, newMessage) => {
    if (newMessage.channel.type == 0 && newMessage.cleanContent != oldMessage.cleanContent) {
        if(oldMessage.embeds.size !== 0) return;
        if(newMessage.attachments.size !== 0) { 
    
            let embed = new discord.EmbedBuilder()
            .setTitle("Сповіщення")
            .setDescription("**Повідомлення було оновлено **📝")
            .setColor("Yellow")
            .addFields({name:"Автор:", value: `${newMessage.author.tag}`, inline:true},
            {name:"Старе:", value: `${oldMessage.cleanContent}`, inline:true},
            {name:"Нове:", value:`${newMessage.cleanContent}`, inline:true},
            {name:"Перейти:", value:`[Натисни](${newMessage.url})`})
            .setImage(newMessage.attachments.first().url)
            sendLog(newMessage,embed)
        }
        else {
            let embed = new discord.EmbedBuilder()
            .setTitle("Сповіщення")
            .setDescription("**Повідомлення було оновлено **📝")
            .setColor("Yellow")
            .addFields({name:"Автор:", value: `${newMessage.author.tag}`, inline:true},
            {name:"Старе:", value: `${oldMessage.cleanContent}`, inline:true},
            {name:"Нове:", value:`${newMessage.cleanContent}`, inline:true},
            {name:"Перейти:", value:`[Натисни](${newMessage.url})`}
            )
            sendLog(newMessage.guild,embed)
        }
        
    }
}