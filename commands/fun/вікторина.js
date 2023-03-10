const Discord = require('discord.js')
let questions = [
    {
        question: "З якого року почався голодомор в Україні?",
        options: ["1932", "1931"],
        correct: "1932"
    },
    {
        question: "Коли була створена відеогра Minecraft?",
        options: ["2009", "2008"],
        correct: "2009"
    },
    {
        question: "Хто побудував ковчег згідно біблії?",
        options: ["Авраам", "Ной", "Давид"],
        correct: "ной"
    },
    {
        question: "Скільки планет офіційно були у складі Сонячної системи до 2006?",
        options: ["11", "7", "9"],
        correct: "9"
    },
    {
        question: 'За літописом Н. Літописця "Повість минулих літ", Київ був збудований...',
        options: ["Трьома братами та сестрою", "Трьома братами", "Князем Рюриком"],
        correct: "трьома братами та сестрою"
    },
    {
        question: "Хто перший підписав декларацію про незалежність США?",
        options: ["Христофор Колумб", "Аврам Лінкольн та Томас Джефферсон", "Джон Генкок"],
        correct: "джон генкок"

    },
    {
        question: "Коли стався вибух на Чорнобильській АЕС?",
        options: ["26 квітня 1986 року", "29 квітня 1986 року", "26 квітня 1987 року"],
        correct: "26 квітня 1986 року"
    },
    {
        question: "Яка дата відзначення Соборності України?",
        options: ["23 січня", "22 січня", "21 січня"],
        correct: "22 січня"
    },
    {
        question: "Де була заснована Запорізька січ?",
        options: ["острів Мала Хортиця", "Острів Труханів", "острів Кислицький"],
        correct: "острів мала хортиця"
    },
    {
        question: "Хто перший український космонавт?",
        options: ["Леонід Каденюк", "Леонід Кизим", "Шонін Георгій"],
        correct: "леонід каденюк",
        image: "https://cdn.discordapp.com/attachments/904758167706169354/912798099603324938/Leonid_Kadenyuk.jpg"
    },
    {
        title: "Цікавий факт щоб відволіктися :)",
        fact: "Якби світ Minecraft був реальний, то він би був за розмірами як Нептун"
    }
]
module.exports.desc = "Зіграй в вікторину!";
module.exports.run = async(client, message, args) => {
    let trivia = questions[Math.floor(Math.random()*(questions.length))]
    if(trivia.fact) {
        const Embed = new Discord.EmbedBuilder()
    .setAuthor({name:`Задав ${message.author.username}`, iconURL:message.author.displayAvatarURL()})
    .setTitle(trivia.title)
    .setDescription(trivia.fact)
    .setFooter({text:`Просто цікавий факт для відпочинку, якщо хочеш повернутися до запитань, напиши цю команду ще раз`, iconURL:client.user.displayAvatarURL()})
    .setColor('Random')
    message.channel.send({embeds:[Embed]})
        return;
    }
    if(!trivia.image) {
    let desc = ""
    for(let i = 0; i < trivia.options.length; i++) {
        desc += `${i + 1}. ${trivia.options[i]}\n`
    }
    const Embed = new Discord.EmbedBuilder()
    .setAuthor({name:`Задав ${message.author.username}`, iconURL:message.author.displayAvatarURL()})
    .setTitle(trivia.question)
    .setDescription(desc)
    .setFooter({text:`Ukrainian Bot`, iconURL:client.user.displayAvatarURL()})
    .setColor('Random')
    message.channel.send({embeds:[Embed]}) }
    if(trivia.image) {
        let desc = ""
        for(let i = 0; i < trivia.options.length; i++) {
            desc += `${i + 1}. ${trivia.options[i]}\n`
        }
       const Embed = new Discord.EmbedBuilder()
    .setAuthor({name:`Задав ${message.author.username}`, iconURL:message.author.displayAvatarURL()})
    .setTitle(trivia.question)
    .setDescription(desc)
    .setImage(trivia.image)
    .setFooter({text:`Ukrainian Bot`, iconURL:client.user.displayAvatarURL()})
    .setColor('Random')
    message.channel.send({embeds:[Embed]})  
    }
    try {
    const filter = response => {
         return response.author.id===message.author.id
    }
    let msgs = await message.channel.awaitMessages({filter, time: 30000, max: 1, errors: ["time"]}).then(m => {
        if(m.first().content.toLowerCase() == trivia.correct.toLowerCase()) {
            const embed = new Discord.EmbedBuilder()
            .setTitle(`Все вірно!`)
            .setDescription(`Ти правильно відповів на запитання **${trivia.question}**`)
            .setAuthor({name:`Задав ${message.author.username}`, iconURL:message.author.displayAvatarURL()})
            .setFooter({text:`${client.user.username}`, iconURL:client.user.displayAvatarURL()})
         return message.reply({embeds:[embed]})
        } else {
            const embed = new Discord.EmbedBuilder()
            .setTitle(`Не вірно!`)
            .setDescription(`Правильна відповідь запитання **${trivia.question}** це: **${trivia.correct}**`)
            .setAuthor({name:`Задав ${message.author.username}`, iconURL:message.author.displayAvatarURL()})
            .setFooter({text:`${client.user.username}`, iconURL:client.user.displayAvatarURL()})
            return message.reply({embeds:[embed]})
        }
    })
    } catch(e){
        console.log(e)
    }
    try {
        const filter = response => {
            return response.author.id===message.author.id
        }
        let msgf = await message.channel.awaitMessages({filter, time: 30000, max: 1, errors: ["time"]}).then(m => {
  return;
   }).catch(() => {
        return
       //message.reply(`Ти задовго писав відповідь, тому я скасував вікторину!`)
   })
    } catch(e) {
        console.log(e)
    }
    
}