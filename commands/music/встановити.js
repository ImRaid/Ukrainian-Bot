const { EmbedBuilder } = require("discord.js")
const { ErrorBuilder } = require('../../handlers/errorBuilder.js')

module.exports = {
    desc: "Отримати посилання на встановлення пісні",
    run: async(client, message, args) => {
        channel = message.member.voice.channel
        if(!channel) return ErrorBuilder(message,'відповідь',null,'Для початку зайди у голосовий канал')
        if (message.guild.channels.cache.some(channel => (
            channel.type === 'voice' && channel.members.has(client.user.id)
        ))) {
            return ErrorBuilder(message,'відповідь',null, 'Я вже знаходжуся у голосовому каналі на цьому сервері');
        }
        const queue = client.distube.getQueue(message)
		if (!queue || !queue.songs || queue.songs.length == 0) return ErrorBuilder(message,"відповідь","Помилка!",`Я зараз нічого не граю`)
        let newTrack = queue.songs[0];
        let embed = new EmbedBuilder()
        .setTitle(`Встановити пісню ${newTrack.name}`)
        .setDescription(`[Натисни сюди щоб встановити її](${newTrack.streamURL})`)
        .setImage(`https://img.youtube.com/vi/${newTrack.id}/mqdefault.jpg`)
        .setFooter({text:`Ukrainian Bot`, iconURL:client.user.displayAvatarURL()})
        await message.reply({embeds:[embed]})
    }

}