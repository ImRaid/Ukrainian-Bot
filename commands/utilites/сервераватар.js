const discord = require('discord.js');
const { ErrorBuilder } = require('../../handlers/errorBuilder');



module.exports.run = async (client, message, args) => {
if(!message.guild.iconURL()) return ErrorBuilder(message,"відповідь",null,`На цьому сервері невстановлено аватар!`)
 
const embed = new discord.EmbedBuilder()
        .setImage(message.guild.iconURL({ format:"png", size:2048 }))
        console.log(embed)
message.reply({embeds:[embed]})

    }
    module.exports.desc = ``