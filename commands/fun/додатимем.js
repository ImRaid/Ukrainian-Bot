const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js')
const { ErrorBuilder } = require("../../handlers/errorBuilder.js")
const axios = require('axios');
const awaited = require('../../awaited.json')
const fs = require('fs')

module.exports = {
    name: 'додатимем',
    desc: 'Маєш свій крутий мем? Додай його за допомогою цієї команди, і якщо людям сподобається твій мем, то він попаде до команди укрмеми!',
    run: async(client, message, args) => {
        if (message.attachments.size === 0) {   
            return 
        }
        const like = new ButtonBuilder()
        .setLabel('👍')
        .setCustomId('like')
        .setStyle('Success')
        const dislike = new ButtonBuilder()
        .setLabel('👎')
        .setCustomId('dislike')
        .setStyle('Danger')
        const row = new ActionRowBuilder()
            .addComponents(like, dislike)
        let allow;
        axios.get('https://api.sightengine.com/1.0/check-workflow.json', {
            params: {
                'url': message.attachments.first().url,
                'workflow': 'wfl_dtTPSbyLkfSeK7qHU6f7W',
                'api_user': '1414006335',
                'api_secret': 'xnvafgREnjXWzzBxYD3F'
            }
        }).then(function (response) {
            console.log(response.data)
            if(response.data.summary.action === "reject") {
                return ErrorBuilder(message, 'відповідь', null, `Бот забороняє використовувати NSFW контент або нацистську символіку у мемах`)
            } else {
        let descr;
        if (args[0]) {
            descr = args.join(' ')
        } else {
            descr = null
        }
        const embed = new EmbedBuilder()
        .setTitle('Мем надіслав ' + message.author.tag + ' з серверу ' + message.guild.name)
        .setDescription(descr)
        .setColor("Random")
        .setImage(message.attachments.first().url)
        .setFooter({text:`${client.user.username}`, iconURL:client.user.displayAvatarURL()})
        const raidID = '948961551954632714'
        const channel = client.users.cache.get(raidID)
        channel.send({embeds:[embed], components:[row]}).then(msg => {
        console.log(msg.id)
        message.reply({
            embeds:[
                new EmbedBuilder()
                .setTitle('Твій мем було успішно надіслано до розробника')
                .setColor("Green")
                .setDescription(`Якщо розробник підтвердить твій мем, то він буде доданий до офіційного серверу Ukrainian Bot, після чого користувачами буде вирішено чи буде він доданий до команди \`ua! меми\``)
                .setFooter({text:`Задав ${message.author.username}`, iconURL:message.author.displayAvatarURL({dynamic: true})})
            ]
        })
        const picture = message.attachments.first().url
        fs.readFile("./awaited.json", "utf8", function(err, jsonString) {
            if(err) {
                return console.log(err)
            }
            let data = JSON.parse(jsonString)
            let newData = {
                [msg.id]: { 
                    title: `Мем надіслав ${message.author.tag} з серверу ${message.guild.name}`,
                    description: descr,
                    userid: message.author.id,
                    image: picture
                }
            }
            const updatedData = { ...data, ...newData}
            fs.writeFile("./awaited.json", JSON.stringify(updatedData), function(err) {
                if(err) return console.log(err)
            })
        })
    })
    }
})
    }
}