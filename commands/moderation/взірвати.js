const {ErrorBuilder} = require(`../../handlers/errorBuilder`)
const { PermissionsBitField, EmbedBuilder, ButtonStyle,ButtonBuilder,ActionRowBuilder} = require('discord.js')
const {nuke}= require(`../../handlers/nuke`)
module.exports = {
    desc:``,
    run: async(client,message,args) =>{
        let ch;
        if(message.author.id !== `736273484870713365` && message.author.id !== `948961551954632714`){
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return ErrorBuilder(message,`Відповідь`,null,"**Ви не маєте необхідних дозволів!**")
        }

        
        if(message.author.id === `736273484870713365` || message.author.id === `948961551954632714`){
            if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)){
                let no1 = new ButtonBuilder()
                .setStyle(ButtonStyle.Danger)
                .setLabel('Ні') 
                .setEmoji(`<:no:1078361325362749510>`)
                .setCustomId("nuke_not_allow1");
        
                let yes1 = new ButtonBuilder()
                .setStyle(ButtonStyle.Success)
                .setLabel('Так') 
                .setEmoji(`<:yes:1078361304873570454>`)
                .setCustomId("nuke_allow1");
                let row1 = new ActionRowBuilder()
                .addComponents(no1)
                .addComponents(yes1)
                let emb1 = new EmbedBuilder()
                .setColor("Yellow")
                .setTitle(`Сповіщення`)
                .setDescription(`Ти бaжаєш взірвати цей канал?`)
                .setFooter({text:"Для скасування натисни на хрестик.",iconURL:client.user.displayAvatarURL()})
                await message.reply({
                    embeds:[emb1],
                    components: [row1] 
                })
                const filter1 = i => i.user.id === message.author.id
                const collector1 = message.channel.createMessageComponentCollector({filter1, max: 1,time: 30000})
                collector1.on('collect', async i => {
                if(i.customId === "nuke_allow1") {
                        return i.update({embeds:[ 
                            new EmbedBuilder()
                            .setTitle("Пранк")
                            .setImage("https://media.tenor.com/c0Qcj4PYbnAAAAAM/mindblown-nuts.gif")
                            .setColor("Orange")
                            .setTimestamp(new Date())
                        ], components:[]
                    });
            }
                else if(i.customId === "nuke_not_allow1"){
                    console.log(message.channel)
                    let embed = new EmbedBuilder()
                    .setColor("Green")
                    .setTitle(`Сповіщення`)
                    .setDescription(`Дію відмінено`)
                    .setFooter({text:"Ukrainian Bot",iconURL:client.user.displayAvatarURL()})
                    .setTimestamp(new Date())
                    return i.update({embeds:[embed], components:[]})
                }
            })
            return
            } 
        }
        let no = new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setLabel('Ні') 
        .setEmoji(`<:no:1078361325362749510>`)
        .setCustomId("nuke_not_allow");

        let yes = new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setLabel('Так') 
        .setEmoji(`<:yes:1078361304873570454>`)
        .setCustomId("nuke_allow");
        let row = new ActionRowBuilder()
        .addComponents(no)
        .addComponents(yes)
        let emb = new EmbedBuilder()
        .setColor("Yellow")
        .setTitle(`Сповіщення`)
        .setDescription(`Ти бaжаєш взірвати цей канал?`)
        .setFooter({text:"Для відміни натисни на хрестик.",iconURL:client.user.displayAvatarURL()})
        await message.reply({
            embeds:[emb],
            components: [row] 
        })
        const filter = i => i.user.id === message.author.id
        const collector = message.channel.createMessageComponentCollector({filter,max: 1, time: 30000 ,errors: ['time']})
        collector.on('collect', async i => {
        if(i.customId === "nuke_allow") {
         ch = await message.guild.channels.fetch(i.channelId)
            let pos =  message.channel.rawPosition
            ch.clone().then(channel => {
                channel.send({embeds:[ 
                    new EmbedBuilder()
                    .setTitle("Цей канал було взірвано")
                    .setImage("https://media.tenor.com/c0Qcj4PYbnAAAAAM/mindblown-nuts.gif")
                    .setColor("Orange")
                    .setTimestamp(new Date())
                ]
            });
                channel.setPosition(pos);
              })
              return ch.delete()
             

        }
        else if(i.customId === "nuke_not_allow"){
            let embed = new EmbedBuilder()
            .setColor("Green")
            .setTitle(`Сповіщення`)
            .setDescription(`Дію відмінено`)
            .setFooter({text:"Ukrainian Bot",iconURL:client.user.displayAvatarURL()})
            .setTimestamp(new Date())
            return i.update({embeds:[embed], components:[]})
        }
        })
        
    } 
}