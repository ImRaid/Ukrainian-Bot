const { EmbedBuilder, PermissionsBitField } = require("discord.js")
const { ErrorBuilder } = require("../../handlers/errorBuilder")
const db = require('quick.db')

module.exports = {
    desc: "",
    run: async(client, message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) { return ErrorBuilder(message, 'відповідь', null, 'У тебе недостатньо прав на сервері для використання цієї команди') }
        let set = args[0]
        if(!set || set !== 'ввімк' && set !== 'вимк') { return ErrorBuilder(message, 'відповідь', null, 'Вкажи, що ти хочеш зробити. Напиши ввімк/вимк.')}
        let embed = new EmbedBuilder()
            .setTitle('Система рівнів')
            .setDescription(`Рівні на сервері ${message.guild.name} були успішно ${set}нені`)
            .setColor("Random")
        message.reply({embeds:[embed]})
        db.set(`level_${message.guild.id}`, set)
    }
}