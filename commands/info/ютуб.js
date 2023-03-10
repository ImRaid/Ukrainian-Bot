const Discord = require('discord.js'); 
const fetch = require('node-superfetch')
const {ErrorBuilder} = require("../../handlers/errorBuilder")

module.exports = {
    desc:``,
    run: async (client, message, args) => {


    let name = args.slice(0).join(" ").replace(/ -/g, " ")

    if (!name)  return ErrorBuilder(message,"Відповідь",null,"Напиши ім'я каналу."); 
   
const KEYYOUTUBE = process.env.keyyt
const chlink = 'Натисни сюди щоб зайти на канал.'


        
            const channel =  await fetch.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=${KEYYOUTUBE}&maxResults=1&type=channel`)

            const data =  await fetch.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.body.items[0].id.channelId}&key=${KEYYOUTUBE}`)
            const embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setAuthor({name:'Ukrainian Bot',icon:client.user.displayAvatarURL()})
            .setTitle('Ютуб статистика')
            .setThumbnail(channel.body.items[0].snippet.thumbnails.high.url)
            .setTimestamp(new Date())
            .addFields(
                {name:"Назва каналу", value:`${channel.body.items[0].snippet.channelTitle}`, inline:false},
                {name:"Його опис:", value:`${data.body.items[0].snippet.description}`, inline:false},
                {name:"Посилання", value:`[${chlink}](https://www.youtube.com/channel/${channel.body.items[0].id.channelId})`, inline:false},
                {name:"Кількість підписників", value:`${parseInt(data.body.items[0].statistics.subscriberCount).toLocaleString()}`, inline:true},
                {name:"Кількість відео", value:`${parseInt(data.body.items[0].statistics.videoCount).toLocaleString()}`, inline:true},
                {name:"Кількість переглядів", value:`${parseInt(data.body.items[0].statistics.viewCount).toLocaleString()}`, inline:true}
                )
            .setImage(data.body.items[0].brandingSettings.image.bannerExternalUrl)
      
            .setFooter({text:'Ukrainian Bot',iconURL:client.user.displayAvatarURL()})
             await message.reply({embeds:[embed]});
        
        
    }
}