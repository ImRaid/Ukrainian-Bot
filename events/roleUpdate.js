const discord = require('discord.js');
const { sendLog } = require('../handlers/logger.js');
module.exports = async(client,oldRole, newRole) => {
const perms1 = new discord.PermissionsBitField(newRole.permissions).toArray();
const perms = new discord.PermissionsBitField(oldRole.permissions).toArray();
           let webhook = await newRole.guild.fetchWebhooks();
            webhook = webhook.find(x => x.name === "Ukrainian Bot log");
            if (oldRole.name !== newRole.name) {
            let emb = new discord.EmbedBuilder()
    .setTitle('**Сповіщення**')
    .setColor('Yellow')
    .setDescription(`**Назву ролі змінено!**`)
    .addFields(
    {name:`Роль:`,value: `${oldRole}`, inline:true},
    {name:`Стара назва:`,value: oldRole.name,inline: true},
    {name:`Нова назва:`, value: newRole.name, inline:true}
    )
    .setFooter({text:`${newRole.id}`})
    sendLog(newRole.guild,emb)
           
            }else if(oldRole.color !== newRole.color){
                let emb = new discord.EmbedBuilder()
                .setTitle('**Сповіщення**')
                .setColor('Yellow')
                .setDescription(`**Колір ролі змінено!**`)
                .addFields(
                {name:`Роль:`,value:`${oldRole}`, inline:true},
                {name:`Старий колір:`,value: `${oldRole.color.toString(16)}`, inline: true},
                {name:`Новий колір:`, value: `${newRole.color.toString(16)}`, inline: true}
                )
                .setFooter({text:`${newRole.id}`})
                sendLog(newRole.guild,emb)
            
            } else if(perms !== perms1){
                try{
                let one =await  perms.join(`\n`)
                let fir = await perms1.join(`\n`) 
                let emb = new discord.EmbedBuilder()
                .setTitle('**Сповіщення**')
                .setColor('Yellow')
                .setDescription(`**Дозволи ролі змінено!**`)
                .addFields(
                 {name:`Роль:`,value: `${oldRole}`, inline:true},
                 {name:`Старі права:`,value: `${one}`, inline: true},
                 {name:`Нові права:`, value: `${fir}`,inline: true}
                 )
                .setFooter({text:`${newRole.id}`})
                sendLog(newRole.guild,emb)
                }catch(e){
                    console.log("--")
                }
              

     
            
       } 
     
    }