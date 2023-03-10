const { channel } = require('diagnostics_channel')
const {EmbedBuilder,PermissionsBitField} = require('discord.js')
const { ErrorBuilder } = require('../../handlers/errorBuilder.js') 
const fs = require('fs')
const request = require('request')
const Parser = require('rss-parser')
const parser = new Parser()
const url = "https://www.youtube.com/feeds/videos.xml?channel_id="
const {channelId} = require('@gonetone/get-youtube-id-by-url')

module.exports = {
    desc: "Додай свій YouTube канал, аби я надсилав у твій канал сповіщення про нові відео!",
    run: async(client, message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send("**Ви не маєте необхідних дозволів!**")
        const baza = args.slice(0).join(" ").split('|')
        let channelurl = baza[0]
        if (!channelurl) {
            return ErrorBuilder(message, 'відповідь', null, 'Вкажи посилання на YouTube канал, звідки я маю надсилати відео!\nПриклад правильного використання команди:\nua! додати-канал https://www.youtube.com/@YouTube | #мійканал | @everyone {channel} випустив нове відео! Його назва: {name}. Посилання: {url}, гайда дивитися!')
        }
        if(!channelurl.startsWith('https://youtube.com/')) {
            return ErrorBuilder(message, 'відповідь', null, 'Вкажи посилання на канал у вигляді https://youtube.com/@YouTube\n\nПриклад правильного використання команди:\nua! додати-канал https://www.youtube.com/@YouTube | #мійканал | @everyone {channel} випустив нове відео! Його назва: {name}. Посилання: {url}, гайда дивитися!')
        }
        let channelid = "";
       if(channelurl.includes("@")) {
        try {
            await channelId(channelurl).then((id) => {
                channelurl = `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`
                channelid = id
            })
        } catch {
            return ErrorBuilder(message, 'відповідь', null, 'Мені не вдалося отримати твоє посилання. Скоріш за все такого YouTube каналу не існує.')
        }
        } else {
            try {
            await channelId(channelurl).then((id) => {
                channelurl = `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`
                channelid = id
            })
            } catch {
                return ErrorBuilder(message, 'відповідь', null, 'Мені не вдалося отримати твоє посилання. Скоріш за все такого YouTube каналу не існує.')
            }
        }
        const channel = baza[1]

        if(!channel) {
            return ErrorBuilder(message, 'відповідь', null, 'Вкажи канал, у який я маю надсилати твоє відео!\nПриклад правильного використання команди:\n`ua! додати-канал https://www.youtube.com/@YouTube | #мійканал | @everyone {channel} випустив нове відео! Його назва: {name}. Посилання: {url}, гайда дивитися!`')
        }
        message.guild.channels.fetch(baza[1].replace("<#", '').replace(">", '')).then((cn) => {
        const msg = baza[2]
        if(!msg) {
            return ErrorBuilder(message, 'відповідь', null, 'Вкажи повідомлення, яке я маю надсилати у канал!\nПриклад правильного використання команди:\n`ua! додати-канал https://www.youtube.com/@YouTube | #мійканал | @everyone {channel} випустив нове відео! Його назва: {name}. Посилання: {url}, гайда дивитися!`')
        }
        try {
        request(channelurl, async(error, response, body) => {
            if (error) {
                return ErrorBuilder(message, 'відповідь', null, 'Сталася невідома помилка, можливо ти вказав неіснуючий YouTube канал')
            }
            if(response.statusCode !== 200) {
                return ErrorBuilder(message, 'відповідь', null, 'Сталася невідома помилка, можливо ти вказав неіснуючий YouTube канал')
            }
            let feed = await parser.parseString(body);
            const latestVideo = feed.items[0]
            let videoLink;
            let videoName;
            if(latestVideo) {
            videoLink = latestVideo.link;
            videoName = latestVideo.title;
            }else{
                videoLink = null;
                videoName = null;
            }
            await fs.readFile('./yt_channels.json', 'utf-8', async function(err, jsonString) {
                if(err) {
                    return console.log(err)
                }
                let newData;
                let data = JSON.parse(jsonString)
                let oldData;
                if(data[message.guild.id]) {
                    for(ch in data[message.guild.id].channels) {
                        if(data[message.guild.id].channels[ch].channel_url === channelurl) {
                            return ErrorBuilder(message, 'відповідь', null, 'Цей YouTube канал вже сповіщається на цьому сервері!')
                        }
                    }
                
                    newData = {
                        [message.guild.id]:{
                            "channels": [
                                {
                                    "channel_url": channelurl,
                                    "channel_name": feed.title,
                                    "lastvideo_url": videoLink,
                                    "remove_channel_url": `https://youtube.com/channel/${channelid}`,
                                    "message": msg,
                                    "channel": cn.id
                                },
                                ...data[message.guild.id].channels
                            ]
                        }
                    }
                } else {
                    
                    newData = {
                        [message.guild.id]:{
                            "channels": [
                                {
                                    "channel_url": channelurl,
                                    "channel_name": feed.title,
                                    "lastvideo_url": videoLink,
                                    "remove_channel_url": `https://youtube.com/channel/${channelid}`,
                                    "message": msg,
                                    "channel": cn.id
                                }
                            ]
                        }
                    }
                }
                fs.writeFile("./yt_channels.json", JSON.stringify({...data, ...newData}, null, 1),(error) => {
                    if(error) {
                        console.log(error)
                    }
                })
                    const embed = new EmbedBuilder()
                    .setTitle('Успіхи!')
                    .setDescription('Я додав цей канал до своєї бази')
                    .setFooter({text: `Задав ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                   await message.reply({
                    embeds:[embed]
                })
        })
    })
} catch(e) {
    console.log(e)
    return ErrorBuilder(message, 'відповідь', null, 'Мені не вдалося отримати твоє посилання. Скоріш за все такого YouTube каналу не існує.')
}

}).catch(() => {
    return ErrorBuilder(message, 'відповідь', null, 'Твій другий аргумент має бути каналом!\nПриклад правильного використання команди:\n`ua! додати-канал https://www.youtube.com/channels/UCBR8-60-B28hp2BmDPdntcQ | #мійканал | @everyone {channel} випустив нове відео! Його назва: {name}. Посилання: {url}, гайда дивитися!`   ')
})
}
}