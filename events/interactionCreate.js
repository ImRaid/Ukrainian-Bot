const Discord = require('discord.js')
const { ButtonBuilder,EmbedBuilder,ActionRowBuilder,ChannelType,ButtonStyle,PermissionsBitField} = require('discord.js')
let awaited = require('../awaited.json')
const fs = require('fs')

module.exports = async(client, interaction) => {
    if (interaction.isButton()) {
            
            fs.readFile('./awaited.json', "utf-8",async function(err, jsonString) {
                if(interaction.customId === 'like') {
                    let choose = interaction.message.embeds[0].image.url
                    try {
                    await interaction.channel.messages.fetch(interaction.message.id).then(async({id}) => {
                    console.log(id)
                if(err) {
                    return console.log(err)
                }
                let data = JSON.parse(jsonString)  // пробував чекай не буде працювати, навіть пробувати не варто теж не буде, пробував
            let user = client.users.cache.get(data[id].userid) //та це тут при чмоу, awaited[(id)] undefined, тут ніхуя не буде чел
            const embed = new Discord.EmbedBuilder()
            .setTitle(`${data[id].title}`)
            .setImage(choose)
            .setFooter({text:`Мем створив ${user.username}`, iconURL:`${user.displayAvatarURL({dynamic:true})}`})
            if(data[id].description) {embed.setDescription(`${data[id].description}`)}
            const channel = client.channels.cache.get('1073323350170017793')
            await channel.send({embeds:[embed]}).then(async(msg) => {
                await msg.react('👍')
                await msg.react('👎')
            })
            await interaction.message.delete()
            await user.send('Розробник прийняв твій мем. Його було надіслано на сервер Ukrainian Bot')
       
        })
            } catch(e) {
                console.log(e)
            }
        
        } else if(interaction.customId === 'dislike') {
            let choose = interaction.message.embeds[0].image.url
            try{
            let user = client.users.cache.get(data[interaction.channel.messages.fetch(interaction.message.id).id].userid)
            await user.send('Нажаль, твій мем було не прийнято. Розробник відхилив його.')
            } catch(e) {
                console.log(e)
            }
        }
        if(interaction.customId === 'tic')  {
        
            if(interaction.guild.channels.cache.find(channel => channel.name === `білет-користувача-${interaction.user.id}`) !== undefined){
                interaction.reply({content:`В тебе вже є не закритий білет!`,ephemeral:true})
                return;
            }
            let button1 = new ButtonBuilder()
            .setCustomId('ticdelete')
            .setEmoji('🔒')
            .setLabel('Закрити білет')
            .setStyle(ButtonStyle.Secondary);
            let emb = new EmbedBuilder()
            .setColor("Yellow")
            .setTitle('Білети')
            .setDescription(`Успішно створено білет. Напиши, що ти хочеш доповісти адміністрації.\n**Якщо ти захочеш закрити білет, то натисни на кнопку** `);
            let row = new ActionRowBuilder()
            .addComponents(button1);
            await interaction.guild.channels.create(
                {
                name:`білет-користувача-${interaction.user.id}`,
                type: ChannelType.GuildText,
                parent: interaction.user,
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone,        
                        deny: [PermissionsBitField.Flags.ViewChannel]                               
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
                    }
                ]
            }).then(channel => channel.send({
                embeds:[emb],
                components:[row]
            }))
        
            await interaction.reply({content: `Успішно створено білет! Перевір канали серверу, він десь там. :)`,
            ephemeral: true
            })
            
            
    
           
            
    
          
            let emb2 = new EmbedBuilder()
            .setTitle('**Сповіщення**')
            .setDescription('**Користувач відкрив білет!**')
            .addFields(
            {name:'Користувач:', value:`<@${interaction.user.id}>`, inline:true},
            {name:'Білет можуть переглядати: ', value:`**Адміністратори**`, inline:true},
            {name:'Білет був створений: ', value:`<t:${Math.floor(Date. now() / 1000)}>`, inline:true}
            )
            .setColor('Yellow'); 
            sendLog(interaction,emb2)
        }else if(interaction.customId === "ticdelete") { 
            let yes = new ButtonBuilder()
            .setCustomId('ticclose')
            .setEmoji('👍')
            .setLabel('Так')
            .setStyle(ButtonStyle.Success);
            let no = new ButtonBuilder()
            .setCustomId('ticclose2')
            .setEmoji('👎')
            .setLabel('Ні')
            .setStyle(ButtonStyle.Danger);
            let row1 = new ActionRowBuilder()
            .addComponents(yes)
            .addComponents(no);
            interaction.reply({
                embeds:[new EmbedBuilder().setColor("Yellow").setTitle(`Сповіщення`).setDescription(`Ти точно хочеш закрити білет?`)],
                components:[row1],
                ephemeral:true
            })
        }else if(interaction.customId === "ticclose"){
            let emb3 = new EmbedBuilder()
            .setTitle('**Сповіщення**')
            .setDescription('**Користувач закрив білет!**')
            .addFields({name:'Білет закрив:', value:`<@${interaction.user.id}>`, inline:true})
            .setTimestamp()
            .setColor('Yellow'); 
            sendLog(interaction,emb3)
            interaction.channel.delete()
            
        }else if(interaction.customId === "ticclose2") {
          interaction.reply({content:'Гаразд, я не закрив білет',ephemeral:true})
        }
    })
    }
}