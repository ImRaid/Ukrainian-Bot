const Discord = require('discord.js')
var isgd = require('isgd');
const { ErrorBuilder } = require('../../handlers/errorBuilder');
module.exports.run = async (client, message, args) => {
    let arg = args;
    if(!args[0]) return ErrorBuilder(message,"відповідь",null,`Напиши посилання!`)
    if (!args[1]){ 
    isgd.shorten(arg, function(res) {
    console.log(res); 
 
    const embed = new Discord.EmbedBuilder()
   .setTitle(`Твоє скорочене посилання`)
   .setDescription(`Ось воно: ${res}!`)
 message.reply({embeds:[embed]})
    })
}else{

    isgd.custom(arg[0],arg[1], function(res) {
    if (res === `Error: Short URLs must be at least 5 characters long`) return ErrorBuilder(message,"відповідь",null,'Короткі URL-адреси повинні мати довжину не менше 5 символів!')
    console.log(res);
    const embed = new Discord.EmbedBuilder()
   .setTitle(`Твоє скорочене посилання`)
   .setDescription(`Ось воно: ${res}`)
 message.reply({embeds:[embed]})
    }) 
}
}
module.exports.desc = ``