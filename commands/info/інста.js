const Discord = require('discord.js'); 
const fetch = require('node-fetch')


module.exports = {
    desc:"Інформація про вказаний вами Instagram аккаунт.",
    run: async (client, message, args) => {
         let name = args.slice(0).join(" ").replace(/ -/g, " ")

    if (!name) return message.channel.send("Напиши ім'я акаунту.");
    const chlink = 'Натисни сюди щоб зайти на профіль.'


try{
            const channel =  await fetch(`https://api.popcat.xyz/instagram?user=${name}`)
             if (channel.body.error) return message.channel.send("Не знайдено акаунт!");
            
          f = channel.body.full_name ;
          if (f === 'None'){
              f = "Немає"
          }
           f2 =channel.body.biography;
           if (f2 === 'None'){
              f2 = "Немає"
          }
          privat = channel.body.private;
        if (privat === false){
            
              privat = "Відкритий"
          }
           if (privat === true){
              privat = "Приватний"
              
          }
          veref = channel.body.verified;
           if (veref === false){
                veref = "<:no_entry:900038758307594260> Не верифікований"
           
          }
           if (veref === true){
             veref = "<:terms:900037999390257182> Верифікований"
          }
        let button1 = new Discord.ButtonBuilder()
      .setStyle('Link')
      .setLabel('Профіль')
      .setEmoji('902259921154891816')  
      .setURL(`https://www.instagram.com/${name}`);

        const row = new Discord.ActionRowBuilder()
          .addComponents(button1)
            const embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setAuthor({name:'Ukrainian Bot',iconURL:client.user.displayAvatarURL()})
            .setTitle('Інформація з Instagram')
            .setThumbnail(`${channel.body.profile_pic}`)
            .addFields({name:"Назва акаунту:", value:`**${channel.body.username}**`})
            .addFields({name:"Повна назва:", value:`**${f}**`})
            .addFields({name:"Його опис:", value:`**${f2}**`})
            
            .addFields({name:"Кількість підписників:", value:`**${channel.body.followers}**`},
            {name:"Кількість підписок:", value:`**${channel.body.following}**`},
            {name:"Кількість постів:", value:`**${channel.body.posts}**`},
            {name:"Кількість коротких відео:", value:`**${channel.body.reels}**`},
            {name:"Тип аккаунту:", value:`**${privat}**`},
            {name:"Верифікація:", value:`**${veref}**`})
            

            .setTimestamp(new Date())
        
      
            .setFooter({name:'Ukrainian Bot',iconURL:client.user.displayAvatarURL()})
            message.channel.send({embeds:[embed], components:[row]});
        } catch(err) {
            const channel =  await fetch(`https://api.popcat.xyz/instagram?user=${name}`)
            message.channel.send('Не вдалося знайти дані акаунту.')
            if (channel.body.error) return message.channel.send("Не знайдено акаунт");
       
        };
    }
}