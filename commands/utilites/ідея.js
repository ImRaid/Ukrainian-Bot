const { EmbedBuilder } = require("discord.js");
const { ErrorBuilder } = require("../../handlers/errorBuilder");


module.exports = {
  aliases: ["ідея", "ідеї"],
  desc:``,
  run: async(client, message, args) => {
if(!args[0]) return ErrorBuilder(message,"повідомлення",null ,"Напиши ідею для розробників!")

let args1 = args.join(' ');
const channel2 = client.channels.cache.get("1079409162636763187")
 const sentMessage = await channel2.send({embeds:[new EmbedBuilder()
.setTitle(`${message.author.username} дав ідею!`)
.setThumbnail(message.author.displayAvatarURL())
.addFields(
    {name: `**Ідею відправив:**`, value:` ${message.author.username}#${message.author.discriminator}`,inline:false},
    {name: ` **З серверу:**`,value:` **${message.guild.name}** `,inline:false},
    {name: `**Сама ідея:** `, value:`${args1}`,inline:false})
.setColor("Random")
.setFooter({text:'Ukrainian Bot', iconURL:client.user.displayAvatarURL()})
      .setTimestamp()]})
sentMessage.react('🟥')
sentMessage.react('🟧')
sentMessage.react('🟩')
message.reply("Твоя ідея була відправлена.")
      
      

  }
}