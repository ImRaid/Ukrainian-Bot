const discord = require('discord.js')

module.exports.run = async(client, message, args) => {
    const embed24 = new discord.EmbedBuilder()
    .setAuthor({name:'Ukrainian Bot', iconURL:client.user.displayAvatarURL()})
    .setTitle('Додати мене на ваш сервер')
    .setThumbnail(message.author.displayAvatarURL())     
    .setURL('https://discord.com/api/oauth2/authorize?client_id=889507614755528765&permissions=8&scope=bot')
    .setDescription(`**Натисни на текст зверху щоб додати мене на ваш сервер**`)
    .setFooter({text:'Дякую за користування мною', iconURL:client.user.displayAvatarURL()})
   message.reply({embeds:[embed24]})
}
module.exports.desc = ``