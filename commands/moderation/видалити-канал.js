const { EmbedBuilder } = require('discord.js')
const { json } = require('@distube/yt-dlp')
const fs = require('fs')
const {channelId} = require('@gonetone/get-youtube-id-by-url')
const { ErrorBuilder } = require('../../handlers/errorBuilder')
const {PermissionsBitField} = require('discord.js')
module.exports = {
    desc: "Прибери сповіщення з свого YouTube каналу",
    run: async(client, message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send("**Ви не маєте необхідних дозволів!**")
        if(!args[0]) {
            return ErrorBuilder(message, 'відповідь', null, 'Вкажи посилання на YouTube канал, який я маю прибрати з сповіщень!')
        }
        if(!args[0].startsWith('https://youtube.com/')) {
            return ErrorBuilder(message, 'відповідь', null, 'Вкажи посилання на канал у вигляді https://youtube.com/@YouTube')
        }
        fs.readFile('./yt_channels.json', "utf-8", async function(err, jsonString) {
            if(err) {
                console.log(err)
            }
            let data = JSON.parse(jsonString)
            for(channel in data[message.guild.id].channels) {
                let url;
                await channelId(args[0]).then((id) => {
                    url = `https://youtube.com/channel/${id}`
                })
                if(data[message.guild.id].channels[channel].remove_channel_url === url){
                    console.log(channel)
                    data[message.guild.id].channels.pop(channel)
                    fs.writeFile('./yt_channels.json', JSON.stringify(data,null,1), (error) => {
                        if (error) console.log(error)
                    })
                    const embed = new EmbedBuilder()
                        .setTitle('Успіхи!')
                        .setDescription('Я видалив цей канал зі своєї бази')
                        .setFooter({text: `Задав ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                    await message.reply({
                        embeds:[embed]
                    })
                    return
                }
            }
            return ErrorBuilder(message, 'відповідь', null, 'У моїй базі немає такого каналу')  //бля тут треба робити ще посилання на сам канал або жди
        })
    }
}