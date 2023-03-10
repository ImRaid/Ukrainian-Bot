const { EmbedBuilder } = require("discord.js")
const { ErrorBuilder } = require('../../handlers/errorBuilder.js')

module.exports = {
    desc: "Дізнайся, що зараз грає!",
    run: async(client, message, args) => {
        channel = message.member.voice.channel
        if(!channel) return ErrorBuilder(message,'відповідь',null,'Для початку зайди у голосовий канал')
        if (message.guild.channels.cache.some(channel => (
            channel.type === 'voice' && channel.members.has(client.user.id)
        ))) {
            return ErrorBuilder(message,'відповідь',null, 'Я вже знаходжуся у голосовому каналі на цьому сервері');
        }
        const queue = client.distube.getQueue(message)
        let loop = ''
        if(queue.repeatMode >= 1) {
            loop = 'Ввімкнено'
        }else if(queue.repeatMode === 0){
            loop = 'Вимкнено'
        }
        let newTrack = queue.songs[0];
        if(!newTrack) return ErrorBuilder(message,"відповідь","Помилка","Пісню не знайдено")
        
        const embed = new EmbedBuilder()
        .setColor('Random')
        .addFields(
        {name: `Задав:`, value: `${newTrack.user}`},
        {name: `Тривалість пісні:`, value: `${newTrack.formattedDuration}`},
        {name:`Пройшло часу:`, value:`${queue.formattedCurrentTime}`},
        {name: `Звук:`, value: `${queue.volume}%`},
        {name: `Повторення:`, value: `${loop}`}
        )
        .setThumbnail(`https://img.youtube.com/vi/${newTrack.id}/mqdefault.jpg`)
        .setAuthor({name:`${newTrack.name}`})
        .setFooter({text:`${newTrack.user.username}`, iconURL:newTrack.user.displayAvatarURL({dynamic:true})})
          await message.reply({embeds:[embed]})
            
         
    }
}