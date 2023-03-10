const {EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, Embed} = require("discord.js")
const fs = require("fs")
module.exports = {
    name: "допомога",
    desc: "Отримати всі команди у Ukrainian Bot",
    run: async(client, message, args) => {
        const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId(
                'selectmenu'
            )
            .setPlaceholder('Вибери, які хочеш побачити команди')
            .addOptions(
                {
                    label: "Інформація",
                    description: "Команди інформації",
                    value: "info",
                    emoji:"975636270036426813"
                },
                {
                    label: "Модерація",
                    description: "Команди модерації бота",
                    value: "mod",
                    emoji: "975634750704353301"
                },
                {
                    label: "Веселощі",
                    description: "Веселі команди бота",
                    value: "fun",
                    emoji: "975635078954754048"
                },
                {
                    label: "Утиліти",
                    description: "Корисні команди бота",
                    value: "util",
                    emoji: "975635360619061290"
                },
                {
                    label: "Рівні",
                    description: "Система рівнів",
                    value: "xp",
                    emoji: "975635902648971314"
                },
                {
                    label: "Музика",
                    description: "Команди бота по музиці",
                    value: "music",
                    emoji: "975636062955241474"
                }
                )
        )
        const embed = new EmbedBuilder()
        .setAuthor({name:"Ukrainian Bot", iconURL:client.user.displayAvatarURL()})
        .setTitle(`Допомога на сервері ${message.guild.name}`)
        .setDescription(`Вибери з меню ті команди, які хочеш. Тут є 6 видів. Прогорни вниз щоб переглянути їх усіх`)      
        .setImage('https://cdn.discordapp.com/attachments/1073567249715183617/1074779822536015922/763bf5de-2736-4b09-8fae-7a43c0e27808.png')
        .setColor("Random")
        .setThumbnail(message.guild.iconURL())
        let msg = await message.reply({embeds:[embed], components:[row]})
        let collector = await msg.createMessageComponentCollector({filter: backup => !backup.user.bot, time: 120000})
        collector.on('collect', async(backup) => {
            if (backup.values[0] === "info") {
                await backup.deferUpdate()
                let desc = "**Інформація**\n=====================\n";
                const files = fs.readdirSync('./commands/info/')
                let infocmds = files.filter(f => f.endsWith(".js"))
                infocmds.forEach(file => {
                    let commandModule = require(`./${file}`)
                    console.log(commandModule.desc)
                    desc = desc + `**ua! ${file.replace(`.js`, "")}** - ${commandModule.desc}\n`
                })
                const embed1 = new EmbedBuilder()
                .setTitle(`Допомога на сервері ${msg.guild.name}`)
                .setAuthor({name:"Ukrainian Bot", iconURL:client.user.displayAvatarURL()})
                .setDescription(desc)
                .setColor("Random")
                .setFooter({text:"Ukrainian Bot", iconURL:client.user.displayAvatarURL()})
                .setThumbnail(msg.guild.iconURL())
                await msg.edit({embeds:[embed1], components:[row]})
            }
            if (backup.values[0] === "fun") {
                await backup.deferUpdate()
                let desc = "**Веселощі**\n=====================\n";
                const files = fs.readdirSync('./commands/fun/')
                let infocmds = files.filter(f => f.endsWith(".js"))
                infocmds.forEach(file => {
                    let commandModule = require(`../fun/${file}`)
                    console.log(commandModule.desc)
                    desc = desc + `**ua! ${file.replace(`.js`, "")}** - ${commandModule.desc}\n`
                })
                const embed1 = new EmbedBuilder()
                .setTitle(`Допомога на сервері ${msg.guild.name}`)
                .setAuthor({name:"Ukrainian Bot", iconURL:client.user.displayAvatarURL()})
                .setDescription(desc)
                .setColor("Random")
                .setFooter({text:"Ukrainian Bot", iconURL:client.user.displayAvatarURL()})
                .setThumbnail(msg.guild.iconURL())
                await msg.edit({embeds:[embed1], components:[row]})
            }
            if (backup.values[0] === "mod") {
                await backup.deferUpdate()
                let desc = "**Модерація**\n=====================\n";
                const files = fs.readdirSync('./commands/moderation/')
                let infocmds = files.filter(f => f.endsWith(".js"))
                infocmds.forEach(file => {
                    let commandModule = require(`../moderation/${file}`)
                    console.log(commandModule.desc)
                    desc = desc + `**ua! ${file.replace(`.js`, "")}** - ${commandModule.desc}\n`
                })
                const embed1 = new EmbedBuilder()
                .setTitle(`Допомога на сервері ${msg.guild.name}`)
                .setAuthor({name:"Ukrainian Bot", iconURL:client.user.displayAvatarURL()})
                .setDescription(desc)
                .setColor("Random")
                .setFooter({text:"Ukrainian Bot", iconURL:client.user.displayAvatarURL()})
                .setThumbnail(msg.guild.iconURL())
                await msg.edit({embeds:[embed1], components:[row]})
            }
            if (backup.values[0] === "music") {
                await backup.deferUpdate()
                let desc = "**Музика**\n=====================\n";
                const files = fs.readdirSync('./commands/music/')
                let infocmds = files.filter(f => f.endsWith(".js"))
                infocmds.forEach(file => {
                    let commandModule = require(`../music/${file}`)
                    console.log(commandModule.desc)
                    desc = desc + `**ua! ${file.replace(`.js`, "")}** - ${commandModule.desc}\n`
                })
                const embed1 = new EmbedBuilder()
                .setTitle(`Допомога на сервері ${msg.guild.name}`)
                .setAuthor({name:"Ukrainian Bot", iconURL:client.user.displayAvatarURL()})
                .setDescription(desc)
                .setColor("Random")
                .setFooter({text:"Ukrainian Bot", iconURL:client.user.displayAvatarURL()})
                .setThumbnail(msg.guild.iconURL())
                await msg.edit({embeds:[embed1], components:[row]})
            }
            if (backup.values[0] === "util") {
                await backup.deferUpdate()
                let desc = "**Утиліти**\n=====================\n";
                const files = fs.readdirSync('./commands/utilites')
                let infocmds = files.filter(f => f.endsWith(".js"))
                infocmds.forEach(file => {
                    let commandModule = require(`../utilites/${file}`)
                    console.log(commandModule.desc)
                    desc = desc + `**ua! ${file.replace(`.js`, "")}** - ${commandModule.desc}\n`
                })
                const embed1 = new EmbedBuilder()
                .setTitle(`Допомога на сервері ${msg.guild.name}`)
                .setAuthor({name:"Ukrainian Bot", iconURL:client.user.displayAvatarURL()})
                .setDescription(desc)
                .setColor("Random")
                .setFooter({text:"Ukrainian Bot", iconURL:client.user.displayAvatarURL()})
                .setThumbnail(msg.guild.iconURL())
                await msg.edit({embeds:[embed1], components:[row]})
            }
        })
    }
}