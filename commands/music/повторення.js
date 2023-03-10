const Discord = require('discord.js')
const { ErrorBuilder } = require('../../handlers/errorBuilder.js')

module.exports = {
    desc: "Зациклити правгравання треку.",
    run: async(client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return ErrorBuilder(message, 'відповідь', 'Помилка!', 'Я на даний момент нічого не граю!')
        if(!args[0])
        return ErrorBuilder(message,'відповідь',`Помилка!`,`Вкажи вид повторення. Доступні види: **пісня**, **черга**. Якщо хочеш вимкнути, то напиши **вимк**`)
      let loopstate = args[0].toString();
      if (loopstate.toString().toLowerCase() === "пісня") loopstate = 1;
      if (loopstate.toString().toLowerCase() === "черга") loopstate = 2;
      if (loopstate.toString().toLowerCase() === "вимк") loopstate = 0;
      loopstate = Number(loopstate);
      if( 0 <= loopstate && loopstate <= 2){
        client.distube.setRepeatMode(message,parseInt(loopstate));
        const embed = new Discord.EmbedBuilder()
        .setTitle('Автоповторення')
        .setColor("Yellow")
        .setDescription(`Повторення було встановлено як \`${args[0].toString().toLowerCase()}\``)
        .setFooter({text: `Задав: ${message.author.tag}`, iconURL:message.author.displayAvatarURL({dynamic: true})})
        await message.reply({embeds:[embed]})
    }
}
}