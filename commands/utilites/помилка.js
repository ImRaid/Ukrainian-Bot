const { EmbedBuilder } = require("discord.js");
const {ErrorBuilder} = require(`../../handlers/errorBuilder`)

module.exports = {
    aliases: ["баг", "помилка"],
    desc:``,
    run: async(client, message, args) => {
if(!args[0]) return ErrorBuilder(message, "повідомлення",null,"Напиши помилку!")
  

let args1 = args.join(' ');
const channel2 = client.channels.cache.get("933063445228683264")

const embed = new EmbedBuilder()
.setTitle('Користувач сповістив про помилку!')
.setThumbnail(message.author.displayAvatarURL())
.addFields(
    {name:`Баг знайшов: `,value:`<@!${message.member.id}>`,inline:false},
    {name:`**З серверу: **`,value:`**${message.guild.name}** `,inline:false},
    {name:`**Сам баг:**`,value:`${args1}`,inline: false}
    )
.setColor("Random")
channel2.send({embeds:[embed]})
message.reply("Твій баг був відправлений.")
      
      

  }
}