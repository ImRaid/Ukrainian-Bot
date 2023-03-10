const discord = require('discord.js')

async function ErrorBuilder(channel, type, title, description) {
    if (!description) return console.error('Помилка, вкажи опис')
    if (!title) title = "Сталася помилка!"
    if (type.toLowerCase() === "відповідь") {
      const embed = new discord.EmbedBuilder().setTitle('Сталася помилка!').setDescription(description).setColor("Red")
      await channel.reply({embeds:[embed]})
    } else if(type.toLowerCase() === "повідомлення") {
      const embed = new discord.EmbedBuilder().setTitle('Сталася помилка!').setDescription(description).setColor("Red")
      await channel.send({embeds:[embed]})
    } else {
      console.error('Твій тип не є відповіддю або повідомленням')
    }
    return
  }

module.exports = {ErrorBuilder}