const Discord = require('discord.js')
const { ErrorBuilder } = require('../../handlers/errorBuilder.js')
module.exports = {
    desc: "Яка пісня наступна?",
    run: async(client, message, args) => {
        if(!message.member.voice.channel) return ErrorBuilder(message,'відповідь',"Помилка!","Для початку зайди у голосовий канал!")
        if (message.guild.channels.cache.some(channel => (channel.type === 'voice' && channel.members.has(client.user.id)))) {
            return ErrorBuilder(message,'відповідь',null, 'Я вже знаходжуся у іншому каналі.');
        }
        const queue = client.distube.getQueue(message)
		if (!queue || !queue.songs || queue.songs.length == 0) return ErrorBuilder(message,"відповідь","Помилка!",`Я зараз нічого не граю`)
        if (!queue || !queue.songs || queue.songs.length == 1) return ErrorBuilder(message,"відповідь","Помилка!",`Черга занадто мала. Зараз грає лише одна пісня!!`)
        let embeds = [];
        let k = 100;
        let theSongs = queue.songs;
        for (let i = 1; i < 10; i += 1) {
            let qus = theSongs;
            const current = qus.slice(i, k)
            let j = i;
            const info = current.map((track) => "⠀" + j++ + `. ` + `**${track.name}**`).slice(0, 10).join('\n');
            const embed = new Discord.EmbedBuilder()
                embed.setColor("Green")
                embed.setTitle(`Черга на сервері ${message.guild.name}`)
                embed.setDescription(`Запросив чергу: \n${message.author}\nТеперішня пісня:\n **${theSongs[0].name}**\n\nНаступні:\n${info}\nПриблизний час: \n**${queue.formattedDuration}**`)
                embed.setThumbnail(message.guild.iconURL())
                embed.setFooter({text:`Задав ${message.author.tag}`,iconURL:message.author.displayAvatarURL({dynamic: true})})
            embeds.push(embed);
            k += 10; 
        
        embeds[embeds.length - 1] = embeds[embeds.length - 1]
        }			
     
        await message.reply({embeds:[embeds[0]]})
    }
}