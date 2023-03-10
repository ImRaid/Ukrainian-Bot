const { EmbedBuilder } = require("discord.js");
const db = require("quick.db")
const fs = require('fs')

module.exports = (client, message) => {
    if(!message.channel) return;
    if(message.author.bot) return;

    if(message.guild) {
        let guildLevels = db.fetch(`level_${message.guild.id}`)
        if(guildLevels === 'ввімк') {
        let userLevel = db.fetch(`guild_${message.guild.id}_level_${message.author.id}`) || 1
      //  console.log(userLevel)
        const xpAddCount = Math.floor(Math.random()*10) + 15
        db.add(`guild_${message.guild.id}_xp_${message.author.id}`, xpAddCount)
        let curLevel = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1
        let curXp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
        let neededXp = curLevel * 500;
        fs.readFile('./level_roles.json', 'utf-8', async(err, jsonString) => {
            if (err) {
                console.log(err)
            }
            let data = JSON.parse(jsonString)
        })
        if(curXp > neededXp) {
            const newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1)
            db.set(`guild_${message.guild.id}_xp_${message.author.id}`, 0)
            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({name:message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                        .setTitle('Рівні')
                        .setDescription(`Вітаю, ${message.author}! Ти підняв свій рівень до ${newLevel}`)
                        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                        .setColor("Random")
                        .setFooter({text: 'Ukrainian Bot', iconURL:client.user.displayAvatarURL()})
                ]
            })
            fs.readFile('./level_roles.json', 'utf-8', async(err, jsonString) => {
                if (err) {
                    console.log(err)
                }
                let data = JSON.parse(jsonString)
                if(data[message.guild.id]) {
                    for(level in data[message.guild.id].roles) {
                        if(data[message.guild.id].roles[level].lvl === db.fetch(`guild_${message.guild.id}_level_${message.author.id}`)) {                            
                            try {
                                let role = message.guild.roles.cache.find(role => role.id === data[message.guild.id].roles[level].give)
                                await message.member.roles.add(role)
                            } catch(e) {
                                console.log(e)
                            }
                        }
                    }
                }
            })
        }
    }
    }

    let prefix;
    
    if(message.content.startsWith('ua!')) {
        prefix = "ua!"
    } else if(message.content.startsWith('укр!')) {
        prefix = "укр!"
    } else return;

    const args = message.content.slice(prefix.length).trim()
        .split(/ +/g)
    const command = args.shift().toLowerCase()

    let cmd = client.commands.get(command);

    if(!cmd){
        if(!client.commands.get(client.aliases.get(command))){
            return
        }else{
            cmd = client.commands.get(client.aliases.get(command))
        }
}

    cmd.run(client, message, args)
}