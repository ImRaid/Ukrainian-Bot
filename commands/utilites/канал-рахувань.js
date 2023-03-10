const {EmbedBuilder,PermissionsBitField, ChannelType} = require('discord.js')
const {ErrorBuilder} =  require('../../handlers/errorBuilder')
const db = require('quick.db')
const fs = require(`fs`)
module.exports = {
  run: async (client, message, args) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return ErrorBuilder(message,`Відповідь`,null,"**Ви не маєте необхідних дозволів!**")
    
    if (!args[0]) {
      let b = await db.fetch(`count_${message.guild.id}`);
      let channelName = await message.guild.channels.fetch(b);
      if (message.guild.channels.cache.has(b)) {
        return ErrorBuilder(message,`Відповідь`,null,`**Канал рахування на цьому сервері встановлений як ${channelName}**`); 
      } else {
        return ErrorBuilder(message,`Відповідь`,null,"**Будь ласка, згадай канал, щоб його встановити!**");
      }
    }

    let channel =
      message.mentions.channels.first() ||
      client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
      message.guild.channels.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );
    
    if (!channel || channel.type !== ChannelType.GuildText ) ErrorBuilder(message,`Відповідь`,null,"**Будь ласка, введи дійсний текстовий канал!**");

    try {
      let a = await db.fetch(`count_${message.guild.id}`);

      if (a === channel.id) {
        console.log(a)
        return ErrorBuilder(message,`Відповідь`,null,
          "**Цей канал уже встановлено як для рахування!**"
        );
    
      } else {
        
       db.set(`currentcount_${message.guild.id}`, 0)
        db.set(`count_${message.guild.id}`, channel.id);

        message.reply(
          `**Рахувальний канал на цьому сервері встановлений як ${channel}!**`
        );
      }
      return;
    } catch (e) {
            return mErrorBuilder(message,`Відповідь`,null,"**Відсутні дозволи або канал не є текстовим!**");
    }
  }
};