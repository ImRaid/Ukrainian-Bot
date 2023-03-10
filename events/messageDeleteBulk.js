const discord = require("discord.js")
const { sendLog } = require('../handlers/logger.js');
module.exports = async(client,message,guild) => {
    let embed = new discord.EmbedBuilder()
    .setTitle('**Сповіщення**')
    .setDescription(`**Повідомлення видалено!** 🗑️`)
    .setColor("Red")
    .addFields(
        {name:`Канал:`,value:`<#${message.first().channel.id}>`,inline:true},
        {name:`Кількість повідомлень:`,value:`${message.size}`,inline:true}
        )
  sendLog(guild.guild,embed)
}