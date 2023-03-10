const { PermissionsBitField } = require("discord.js");
const db = require("quick.db")
const {ErrorBuilder} = require("../../handlers/errorBuilder")
module.exports = {
    desc:"",
    run: async (bot, message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageWebhooks)) return message.channel.send("**Ви не маєте необхідних дозволів!**")
  
      let b = await db.fetch(`modlog_${message.guild.id}`);
      let channelName = message.guild.channels.cache.get(b);
      if (message.guild.channels.cache.has(b)) return ErrorBuilder(message,"відповідь",null, `**Канал Логу, встановлений на цьому сервері \`${channelName.name}\`!**`);
      
       
        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
        console.log(channel.type)
        if (!channel || channel.type !== 0) return ErrorBuilder(message,"відповідь",null,"**Будь ласка, введіть дійсний текстовий канал!**");

        try {
            let a = await db.fetch(`modlog_${message.guild.id}`)

            if (channel.id === a) {
                
                db.set(`modlog_${message.guild.id}`, channel.id)
                let webhook = await message.guild.fetchWebhooks();
              
                webhook = webhook.find(x => x.name === "Ukrainian Bot log");

                if (!webhook) {
                webhook = await channel.createWebhook({
                name:"Ukrainian Bot log",
                avatar: message.guild.iconURL({ format: 'png', size: 2048,dynamic: true })
     
    });
                }
                return ErrorBuilder(message,"відповідь",null, "**Цей канал уже встановлено!**")

            } else {

                db.set(`modlog_${message.guild.id}`, channel.id)
                let webhook = await message.guild.fetchWebhooks();
            
                webhook = webhook.find(x => x.name === "Ukrainian Bot log");

                if (!webhook) {
                    webhook = await channel.createWebhook({
                        name:"Ukrainian Bot log",
                        avatar: message.guild.iconURL({ format: 'png', size: 2048,dynamic: true })})
     
    
                }
                message.channel.send(`**Канал було успішно налаштовано \`${channel.name}\`!**`)
            }
            
        } catch {
            return ErrorBuilder(message,"відповідь",null,"**Відсутні дозволи або канал не є текстовим!**");
        }
    }
};
 