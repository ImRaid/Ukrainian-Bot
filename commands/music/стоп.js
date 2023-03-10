const Discord = require('discord.js')
const { ErrorBuilder } = require('../../handlers/errorBuilder.js')
module.exports = {
    desc: "Закінчити прослуховування.",
    aliases: ["покинути", "вийти", "стоп"],
    run: async(client, message, args) => {
        if(!message.member.voice.channel) return ErrorBuilder(message,'відповідь',"Помилка!","Для початку зайди у голосовий канал!")
        if (message.guild.channels.cache.some(channel => (channel.type === 'voice' && channel.members.has(client.user.id)))) {
            return ErrorBuilder(message,'відповідь',null, 'Я вже знаходжуся у іншому каналі. Зайди туди щоб зупинити музику.');
        }
        const queue = client.distube.getQueue(message)
		if (!queue || !queue.songs || queue.songs.length == 0) return ErrorBuilder(message,"відповідь","Помилка!",`Я зараз нічого не граю`)
		await queue.stop()
        let embed = new Discord.EmbedBuilder()
        .setTitle('Сповіщення!')
        .setDescription(`Пісні закінчені, я вийшов з каналу.`)                          
        .setColor("Yellow")
        .setFooter({text:`Задав ${message.author.tag}`,iconURL:message.author.displayAvatarURL({dynamic: true})})
        await message.reply({embeds:[embed]})
    }
}