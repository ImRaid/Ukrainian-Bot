const discord = require('discord.js')
const fetch = require('node-fetch')
const db = require('quick.db')
const axios = require("axios");

module.exports = {
    name: 'профіль',
    desc: "Інформація про вас, або вказаного вами користувача.",
    run: async(client, message, args) => {
        
    const months = {
            1: "Січня",
            2: "Лютого",
            3: "Березня",
            4: "Квітня",
            5: "Травень",
            6: "Червня",
            7: "Липня",
            8: "Серпня",
            9: "Вересня",
            10: "Жовтня",
            11: "Листопада",
            12: "Грудня"
        };
  
        const user = message.mentions.members.first() || message.member || message.author;
     
    const usercount = db.get(`usercount_${user.user.id}_${message.guild.id}`) || 'Ця людина ще не рахувала.';
 var checking = db.fetch(`birthdate_${user.id}`);
var checking2 = db.fetch(`info_${user.id}`);
        

  if(!checking) checking = 'Не вказане.'
  if(!checking2) checking2 = 'Людина ще не вказала!'
  let blint = client.users.fetch(user.id);
  console.log(blint)
  let banner = null;

   

   
     // я щас можу створити акк в оракл як хоч роби


         let embed = new discord.EmbedBuilder()        
            .setTitle(`**Інформація про  ${user.user.username}**`)   
      
        //hi оооо як в репліті
             let bot = ''
    if(user.user.bot === false){
        bot = 'Ні'
    }else {
        bot = 'Так'
    }


      let rolemap = user.roles.cache.map((role) => role.toString()).join('\n');
if (rolemap.length > 1024) rolemap = "Занадто багато ролей для показу";
             if (!rolemap) rolemap = "Нема ролей!";
        embed.setDescription(`
        ***Головна Інформація:***\n----------->`)
        embed.addFields({name:`
    **Ім'я:**`,value:`**${user.user.username}**
    `})
    embed.addFields({name:`
    **#️⃣ Дискримінатор:**`,value:`
    **${user.user.discriminator}**`})
   embed.addFields({name:` **Аккаунт був створений:** `,value:`<t:${parseInt(user.user.createdAt/1000)}:R>`})

   embed.addFields({name:`
**Дата входу на сервер: ** `,value:`<t:${parseInt(user.joinedAt/1000)}:R>`})
   embed.addFields({name:` **День народження:** `,value:`**${checking}**`})
    embed.addFields({name:` **Про себе:** `,value:`**${checking2}**`})
    embed.addFields({name:`**Рахував:**`, value:`**${usercount}**`})
    embed.addFields({name:`**Невірних рахувань:**`, value:`**${db.get(`usercountnotright_${user.user.id}_${message.guild.id}`) || 'У користувача нема невірних рахувань'}**`})
embed.addFields({name:`
    **Ролі:**`,value:`
    **${rolemap}**
    `})
    embed.addFields({name:`
    **БОТ:**`,value:`
    **${bot}**
    `})
    
    

    await axios.get(`https://discord.com/api/users/${user.id}`,{
        headers:{
         Authorization: `Bot ${client.token}`
        }
   }).then((res)=>{
    const {banner ,accent_color} = res.data;
    
        

    if(!banner){ 
    embed.setColor('Random')
      embed.setThumbnail(user.user.displayAvatarURL({ dynamic: true }))      
     embed.setFooter({text:`Айді: ${message.author.id}`, iconURL:client.user.displayAvatarURL()})
    }else{
        const extension = banner.startsWith("a_") ? ".gif" : ".png"; 
    embed.setImage(`https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=512`)
     embed.setColor('Random')
      embed.setThumbnail(user.user.displayAvatarURL({ dynamic: true }))      
    embed.setFooter({text:`Айді: ${message.author.id}`, iconURL:client.user.displayAvatarURL()})
    }
})
       message.channel.send({
        embeds:[embed]
       })
             }
            }
        