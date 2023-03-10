const { EmbedBuilder } = require("discord.js");
const { isTextChannelInstance } = require("distube");
const distube = require('distube').default;
const { ErrorBuilder } = require('../../handlers/errorBuilder.js')
const db =require("quick.db");
module.exports = {
    aliases: ["г", "музика", "грати"],
    desc: "Ввімкни музику у своєму голосовому каналі!",
    run: async(client, message, args) => {
        if (!args[0]) {
            return ErrorBuilder(message,'відповідь','Будь ласка, напиши пісню!', "Приклад: **ua! <посилання на трек>**")
        }
        channel = message.member.voice.channel
        if(!channel) return ErrorBuilder(message,'відповідь',null,'Для початку зайди у голосовий канал')
        if (message.guild.channels.cache.some(channel => (
            channel.type === 'voice' && channel.members.has(client.user.id)
        ))) {
            return ErrorBuilder(message,'відповідь',null, 'Я вже знаходжуся у голосовому каналі на цьому сервері');
        }
        let newmsg = await message.channel.send({
            content: `Шукаю пісню за вашим запитом. Зачекайте будь ласка`,
        }).catch(e => {
            console.log(e)
        }) 
    try{
       await client.distube.play(channel, args.join(' '), {
            member: message.member,
            textChannel: message.channel,
            message
       })
    } catch(e) {
        await ErrorBuilder(message.channel, 'повідомлення', null, 'Нажаль, мені не вдалося зіграти цю пісню. Можливо, посилання не є публічним або такої пісні не існує. Будь ласка, перевірте це і спробуйте ще раз.')
        return;
    }
        newmsg.delete().catch(e => {
            console.log(e)
        })
    }

  //  db.set(`currentsong_${message.guild.id}`, args[0])
}