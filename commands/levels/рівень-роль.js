const { EmbedBuilder,PermissionsBitField, Embed } = require("discord.js")
const fs = require('fs')

const { ErrorBuilder } = require("../../handlers/errorBuilder")

module.exports = {
    run: async(client, message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) { return ErrorBuilder(message, 'відповідь', null, 'У тебе недостатньо прав на сервері для використання цієї команди') }
        const choose = args[0].split()
        console.log(choose)
        if(!choose || choose[0] !== "додати" && choose[0] !== "забрати") { return ErrorBuilder(message, 'відповідь', null, 'Не правильний набір аргументів! \nПравильний набір: ua! рівень-роль додати/забрати @роль 5') }
        const маєбутироллю =  message.mentions.roles.first().id//norm
        message.guild.roles.fetch(`${маєбутироллю}`).then(async(role) => {
            console.log(role.position)
            if(role.position > message.guild.members.resolve(client.user).roles.highest.position) return ErrorBuilder(message, 'відповідь', null,`Моя роль нижче ніж вказана.`)
            const lvl = args[2]
            if(!lvl || isNaN(lvl)) {
                return ErrorBuilder(message, 'відповідь', null, 'Вкажи, при якому рівні тобі буде видаватися роль. \nПриклад правильного набіру аргументів: ua! рівень-роль додати/забрати @роль 5')
            }
            await fs.readFile('./level_roles.json', 'utf-8', async(err, jsonString) => {
                if(err) {
                    console.log(err)
                }
                let data = JSON.parse(jsonString)
                let newData;
                if(data[message.guild.id]) {
                    newData = {
                        [message.guild.id]: {
                            "roles": [
                                {
                                    "lvl": lvl,
                                    "give": role.id
                                },
                                data[message.guild.id].roles
                            ]
                        }
                    }
                } else {
                    newData = {
                        [message.guild.id]: {
                            "roles": [
                                {
                                    "lvl": lvl,
                                    "give": role.id
                                }
                            ]
                        }
                    }
                }
                fs.writeFile('./level_roles.json', JSON.stringify({  ...data, ...newData}, null, 1), (error) => {
                    if(error) {
                        console.log(error)
                    }
                })
                if(choose[0] === 'додати') {
                await message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('Успіхи')
                            .setColor("Green")
                            .setDescription(`Роль ${role} успішно встановлена як та, що буде видаватися при отриманні ${lvl} рівня!`)
                            .setFooter({text:client.user.username,iconURL: client.user.displayAvatarURL()})
                            .setThumbnail(message.guild.iconURL())
                    ]
                })
            } else {
                await message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('Успіхи')
                            .setColor("Green")
                            .setDescription(`Роль ${role} відтепер не буде додаватися при досягненні ${lvl} рівня!`)
                            .setFooter({text:client.user.username,iconURL: client.user.displayAvatarURL()})
                            .setThumbnail(message.guild.iconURL())
                    ]
                })
            }
            })
        }).catch(e => {
            console.log(e)
            return ErrorBuilder(message, 'відповідь', null, `Схоже, ти вказав неіснуючу роль. Перевір наявність ролі <@${маєбутироллю}>. \nПравильний набір аргументів: ua! рівень-роль додати/забрати @роль 5`)
        })
    }
}