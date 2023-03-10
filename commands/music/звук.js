const Discord = require('discord.js')
const { ErrorBuilder } = require('../../handlers/errorBuilder.js')
module.exports = {
    desc: "Збільшити або зменшити гучність!",
    run: async(client, message, args) => {
        if(!message.member.voice.channel) return ErrorBuilder(message,'відповідь',"Помилка!","Для початку зайди у голосовий канал!")
        if (message.guild.channels.cache.some(channel => (channel.type === 'voice' && channel.members.has(client.user.id)))) {
            return ErrorBuilder(message,'відповідь',null, 'Я вже знаходжуся у іншому каналі.');
        }
        const queue = client.distube.getQueue(message)
		if (!queue || !queue.songs || queue.songs.length == 0) return ErrorBuilder(message,"відповідь","Помилка!",`Я зараз нічого не граю`)
        if (!args[0]) return ErrorBuilder(message,'відповідь',`Помилка!`,`Будь ласка, напиши гучність звуку з 0 до 100!`)
        let volume = Number(args[0])
		if (volume > 100 || volume < 0) return ErrorBuilder(message,'відповідь',`Помилка!`,`Будь ласка, напиши гучність звуку з 0 до 100!`)
        await queue.setVolume(volume);
        let embed = new Discord.EmbedBuilder()
        .setTitle('Сповіщення!')
        .setDescription(`Змінено гучність на \`${volume}%\``)                          
        .setColor("Yellow")
        .setFooter({text:`Задав ${message.author.tag}`,iconURL:message.author.displayAvatarURL({dynamic: true})})
        await message.reply({embeds:[embed]})

    }
}