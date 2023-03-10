const {EmbedBuilder} = require('discord.js')
const { ErrorBuilder } = require('../../handlers/errorBuilder')
const fs = require('fs')
module.exports = {
    desc: "Додай канал, куди я буду надсилати всю інформацію про тривоги!",
    run: async(client, message, args) => {
        const channel = message.mentions.channels.first()
        if(!channel) return ErrorBuilder(message, 'відповідь', null, 'Вкажіть канал у який я буду відправляти інформацію про тривоги')//В ананас идите 🍍🍍🍍
        fs.readFile('./alerts.json', 'utf-8', async function(err, jsonString) {
            if(err) {
                console.log(err)
            }
            let data = JSON.parse(jsonString)
            if(data[message.guild.id]) {
                data[message.guild.id].channel = channel.id
            } else {
            let newData = {
                [message.guild.id]: {
                    "channel": channel.id
                }
            }
            data = {  ...data, ...newData}
        }
            await fs.writeFile("./alerts.json",JSON.stringify(data,null,1),async(error) => {
                if (error) {
                  console.log(error);
                }
                const embed = new EmbedBuilder()
                .setTitle('Успіхи!')
                .setDescription('Я додав цей канал до своєї бази')
                .setFooter({text: `Задав ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
               await message.reply({
                embeds:[embed]
            })
              });
        })
    }
    
}