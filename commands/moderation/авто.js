const { PermissionsBitField, EmbedBuilder, Embed } = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client, message, args) => {
    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return message.reply('Недостатньо прав!')
    }
    if(!args[0]) return message.reply('Неправильний напис! Вкажи що ти хочеш зробити. Наприклад: **ua! авто ввімк/вимк**')
    let desc;
    if(args[0] === 'ввімк') { desc = 'Тепер авто роль увімкнена!' } else if(args[0] === 'вимк') { desc = 'Тепер авто роль вимкнена!' }
    else {
        return message.reply('Неправильний напис! Вкажи що ти хочеш зробити. Наприклад: **ua! авто ввімк/вимк**')
    }
    let embed = new EmbedBuilder()
    .setTitle('Система авторолі')
    .setDescription(desc)
    .setColor("Random")
    .setFooter({text:`${client.user.username}`, icon:client.user.displayAvatarURL()})
    message.reply({embeds:[embed]})
    db.set(`auto_${message.guild.id}`, args[0])
}

module.exports.desc = "Увімкнути автороль на сервері.";