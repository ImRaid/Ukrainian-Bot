const { data } = require('@tensorflow/tfjs');
const { EmbedBuilder, MessageCollector, ButtonBuilder } = require('discord.js')
const { ErrorBuilder } = require('../../handlers/errorBuilder.js')
let n = 0;
const fs = require('fs')

module.exports.run = async(client, message, args) => {
    let name = args.join(' ').split('|')[0]
    let desc = args.join(' ').split('|')[1]
    if(!name) return ErrorBuilder(
        message, 
        'відповідь',
        null,
        `Вкажи назву історії! \nПриклад заповнення команди: ua! створити-історію Назва історії | Опис історії`
    )
    if(!desc) return ErrorBuilder(
        message, 
        'відповідь',
        null,
        `Вкажи опис історії! \nПриклад заповнення команди: ua! створити-історію Назва історії | Опис історії`
    )
    await message.reply({
        embeds:[
            new EmbedBuilder()
                .setTitle(`Написання історії`)
                .setDescription(`Напиши першу сторінку своєї історії\nНагадування: Для згадки про користувач, ти можеш написати {user}\nПриклад: {user} зробив якусь дію\nКоли твоя історія буде готова, напиши готово`)
                .setColor("Random")
                .setFooter({text:`Історію пише ${message.author.username}`, iconURL:message.author.displayAvatarURL({ dynamic: true })})
            ]
        })
    const filter = msg => msg.author.id === message.author.id
    const collector = new MessageCollector(message.channel, filter)

    let historyPages = {}
    collector.on('collect', (msg, col) => {
        if(msg.author.id !== message.author.id) return
        if(msg.author.bot !== false) return
        if(msg.content.toLowerCase() === 'готово') {
            const author = message.author.id
            historyPages = {
                total: n,
                ...historyPages
            }
            fs.readFile('./histories.json', 'utf-8', async(err, jsonString) => {
                if(err) console.log(err)
                let data = JSON.parse(jsonString)
                console.log(data)
                let historyData;
                if(data.histories) {
                historyData = {
                    histories: [
                        ...data.histories,
                        {
                            author: `${message.author.id}`,
                            name: name,
                            description: desc,
                            pages: historyPages
                        }
                    ]
                }
                } else {
                    historyData = {
                        histories: [
                            {
                                author: `${message.author.id}`,
                                name: name,
                                description: desc,
                                pages: historyPages
                            }
                        ]
                    }  
                }
                fs.writeFile('./histories.json', JSON.stringify(historyData, null, 1), (error) => {
                    if (error) {
                        console.log(error)
                    }
                })
            })
        } else {
            n += 1;
            let previous = new ButtonBuilder;
            previous.setEmoji('◀')
            let next = new ButtonBuilder;
            next.setEmoji('▶')
            let s = `page_${n}`
            historyPages = {
                ...historyPages,
                [s]: msg.content
            }
            console.log(msg)
            message.reply({
                embeds: [
                        new EmbedBuilder()
                        .setAuthor({name:`Приклад того, як у майбутньому буде виглядати історія`})
                        .setTitle(`Сторінка ${n}`)
                        .setDescription(`${msg.content.replace('{user}', msg.author)}`)
                        .setColor("Random")
            ]
            })
        }
    })
}