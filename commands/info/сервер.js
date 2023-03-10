const { EmbedBuilder } = require("discord.js");
const axios = require("axios");

//ого хіхі
module.exports = {
  run: async (client, message, args) => {
      async function getGuildBannerUrl(guildId,{ dynamicFormat = true, defaultFormat = "webp", size = 512 } = {}) {
    const guild = await client.guilds.cache.get(guildId);
    let baseUrl = `https://cdn.discordapp.com/banners/${guildId}/${guild.banner}`;
    const query = `?size=${size}`;
    if (!guild.banner) return null;
    if (dynamicFormat) {
        const { headers } = await axios.head(baseUrl);
        if (headers && headers.hasOwnProperty("content-type")) {
            return baseUrl + (headers["content-type"] == "image/gif" ? ".gif" : `.${defaultFormat}`) + query;
        }
    }

    return baseUrl + `.${defaultFormat}` + query;

}
   let emojis = message.guild.emojis.cache
 .map((e) => `${e}`)
 .join(' ') || "Цей сервер поки що не має емодзі"; 
if (emojis.length > 1024) emojis = "Забагато емодзі для показу"; 
     const guild = message.guild; 
    const Emojis = guild.emojis.cache.size || "На сервері поки що нема емодзі.";
    const Roles = guild.roles.cache.size || "Поки що нема ролей.";
    const Members = guild.memberCount;
    const members = message.guild.members.cache;
    const Humans = guild.members.cache.filter(member => !member.user.bot).size;
    const Bots = guild.members.cache.filter(member => member.user.bot).size;
    const channels = message.guild.channels.cache;
    const RolesServer = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
    const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1)
    let rolesdisplay;
    if(roles.length < 70) {
        rolesdisplay = roles.join(" ")
    } else {
        rolesdisplay = roles.slice(70).join(" ")
       }
let rolelist = message.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(r => r)
            .join("\n");
            if (rolelist.length > 1024) rolelist = "Забагато ролей для показу";
            if (!rolelist) rolelist = "Поки що нема ролей";
    
    let baner = await getGuildBannerUrl(message.guild.id)
   console.log(guild.ownerID)
    message.guild.bans.fetch().then(async (bans) => {
    const guild = message.guild;
    let us = await guild.members.fetch(`${guild.ownerId}`)
    const embed = new EmbedBuilder()
    
      .setTitle("Інформація серверу " + guild.name)
      .setColor('Random')
      .setThumbnail(guild.iconURL())
      
        if(!guild.available) return; // Stops if unavailable
      embed.addFields(
        {name:`Назва:`, value: `${guild.name}`, inline:false},
        {name:`Айді серверу:`, value: `${guild.id}`, inline:false},
        {name:`Власник:`,value: `${us.user.tag}`, inline:false},
        {name:`<:pngaaa:892132675299708978> Бустів на сервері:`, value:`${message.guild.premiumSubscriptionCount}`, inline:false},
        {name:`<:busts_in_silhouette:892130146063114240>  Людей:`, value:`${Humans}`, inline:false},
        {name:`<:robot:892129777413144637> Ботів:`,value: `${Bots}`,inline: false},
        {name:`<:performing_arts:892130631453143131> Ролей:`,value: `${Roles}`, inline:true},
        {name: `<:ua_happy:890612461416374282> Емодзі:`,value: `${Emojis}`, inline:true},
        {name:`<:pencil:892131952780509214> Текстових каналів:`, value:`${channels.filter(channel => channel.type === 0).size}`},
        {name:`<:headphones:892130935020073080> Голосових каналів:`, value:`${channels.filter(channel => channel.type === 2).size}`,inline: true},
        {name:`Заблокованих користувачів:`,value:`${bans.size}`, inline:false},
        {name:`Всі ролі:`, value:`${rolelist}`},
        {name:`Всі емодзі:`, value:`${emojis}`, inline:false}
        )
    if (baner === null){
      embed.setFooter({text:`Ukrainian Bot`})
      embed.setThumbnail(message.guild.iconURL())
      embed.setTimestamp();
    } else{
        embed.setImage(`${baner}`) 
        embed.setFooter({text:`Ukrainian Bot`})
        embed.setThumbnail(message.guild.iconURL())
        embed.setTimestamp();//чек серв
    }
  

    await message.reply({embeds:[embed]});

  })
    
    
  }
};