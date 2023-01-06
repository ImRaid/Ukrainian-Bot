const discord = require("discord.js")

module.exports = {
    name: 'вимкнути',
    run: async(client, message, args) => {
        if(message.author.id === "736273484870713365" || message.author.id === "948961551954632714") {
            await message.reply('Бот вимикається...').then(() => {
            process.exit()
            })
        } else {
            message.reply('Ти не маєш прав на використання цієї команди')
        }
    }
}