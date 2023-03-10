const { EmbedBuilder } = require('discord.js');
const { ErrorBuilder } = require("../../handlers/errorBuilder")

let words = [
    "медицина", "життя", "світ", "гра", "комп'ютер", "картопля", "колір", "космос", "телефон", "смартфон", "козак", "українець", "сайт", "слух", "літак", "письмо", "секунда", "хвилина", "година", "пісня", "прожиття", "вічність", "ера", "століття", "тисячоліття", "десятиліття", "поліція", "вчитель", "м'ясо", "людина", "кіт", "собака", "тварина", "ведмідь", "лев", "тигр", "вовк", "лисиця", "країна", "столиця", "місто", "рік", "день", "половина", "час", "біда", "книга", "текст", "слово", "рід", "годинник", "розум", "світло", "швидкість", "море", "океан", "іграшка", "зірка", "планета", "галактика", "всесвіт", "місяць", "сонце", "людство", "поверх", "хмарочос", "чоловік", "жінка", "хлопець", "дівчина", "малий", "великий", "талант", "порожнеча"
]

module.exports.run = async (client, message, args) => {
    let word = words[Math.floor(Math.random()*(words.length))]
    let embed = new EmbedBuilder()
    .setTitle(`Твоє слово: ${word}`)
    .setDescription(`Напиши його в чат! В тебе є 20 секунд!`)
    .setFooter({text:`Грає ${message.author.username}`, iconURL:message.author.displayAvatarURL()})
    .setThumbnail(client.user.displayAvatarURL())
    await message.reply({
        embeds:[embed]
    })
    
        const msg_filter = response => {
            return response.author.id === message.author.id && message.content.toLowerCase() == word.toLowerCase();
          };
   
        const collector = message.channel.awaitMessages({ msg_filter,  time: 20000, max: 1, errors: ["time"] }).then(msg => {
            message.channel.messages.fetch(msg.id).then(async({author}) =>  {
                console.log(author)
                if(member.id !== message.author.id) {return}
            if(m.content.toLowerCase() == word.toLowerCase()) {
        const embed = new EmbedBuilder()
        .setTitle(`Все вірно!`)
        .setDescription(`Ти правильно написав слово **${word}**`)
        .setAuthor({name:`${message.author.username}`, iconURL:message.author.displayAvatarURL()})
        message.reply({
        embeds:[embed]
    })
    return
} else {
    const embed = new EmbedBuilder()
    .setTitle(`Не вірно!`)
    .setDescription(`Ти не правильно написав слово **${word}**! Ти написав: **${m.first().content}**`)
    .setAuthor({name:`${message.author.username}`, iconURL:message.author.displayAvatarURL()})
    message.reply({
        embeds:[embed]
    })
    return
}

})
    }).catch((e) => {
        return console.log(e)
    })
    try {
        const filter = (response) => {
            return response.author.id === message.author.id;
          };
        let msgf = await message.channel.awaitMessages({filter, time: 20000, max: 1, errors: ["time"]}).then(m => {
  return;
   }).catch(() => {
        return 
   })
    } catch(e) {    
        console.log(e)
    }

}
   
module.exports.desc = "";