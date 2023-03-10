const Discord = require('discord.js')
const { ErrorBuilder } = require('../../handlers/errorBuilder.js')
module.exports = {
    desc: "Програвання минулої пісні.",
    run: async(client, message, args) => {
        if(!message.member.voice.channel) return ErrorBuilder(message,'відповідь',"Помилка!","Для початку зайди у голосовий канал!")
        if (message.guild.channels.cache.some(channel => (channel.type === 'voice' && channel.members.has(client.user.id)))) {
            return ErrorBuilder(message,'відповідь',null, 'Я вже знаходжуся у іншому каналі.');
        }
        const queue = client.distube.getQueue(message)
		if (!queue || !queue.songs || queue.songs.length == 0) return ErrorBuilder(message,"відповідь","Помилка!",`Я зараз нічого не граю`)
        if (!queue || !queue.previousSongs || queue.previousSongs.length == 0) return ErrorBuilder(message,"відповідь","Помилка!",`Немає минулих пісень!`)
        await queue.previous();
        let embed = new Discord.EmbedBuilder()
        .setTitle('Сповіщення!')
        .setDescription(`Я повернувся до минулої пісні!`)                          
        .setColor("Yellow")
        .setFooter({text:`Задав ${message.author.tag}`,iconURL:message.author.displayAvatarURL({dynamic: true})})
        await message.reply({embeds:[embed]})
    }
}