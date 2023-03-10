const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: '8куля',
  desc: "Запитай щось у 8кулі(8ball).",
  run: async(client, message, args) => {
    let args1 = args.join(' ')
    if(!message.guild) return;
    if(!args1) return message.reply('Напиши запитання!')
    let responses = [
      "Так",
      "Ні",
      "Мені треба подумати",
      "Я не впевнений",
      "Звісно",
      "Не слід цього робити...",
      "Краще перенести це на деякий час",
      "Не можу на це відповісти",
      "Навіть не думай"
      ]
    let response = responses[Math.floor(Math.random()*responses.length)]
    
    let embed = new EmbedBuilder()
    .setTitle("<:eightball:898984920385482802> Куля каже")
    .setDescription(`Запитання:\n${args1}\nЇї відповідь:\n${response}`)
    .setColor("Random")
    .setThumbnail(client.user.displayAvatarURL())
    message.channel.send({
      embeds: [embed]
    })
  }
}