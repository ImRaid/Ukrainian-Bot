const {EmbedBuilder,AttachmentBuilder} = require("discord.js")
const AmeClient = require("amethyste-api");
module.exports = {
 desc:"",
run: async(client, message, args) => {
  
 let AmeAPI = new AmeClient(process.env.ImageAPI);
 const user = message.mentions.users.first() || message.author;

        const buffer = await AmeAPI.generate("fire", { url: user.displayAvatarURL({size:512}).replace('.webp', '.png')});
       
        const attachment = new AttachmentBuilder(buffer,{name:"fire.png"});
      
        let embed = new EmbedBuilder()
        .setColor('Random')
       .setAuthor({name:'Ukrainian Bot', icon_url:client.user.displayAvatarURL()})
        .setTitle('Вогонь <a:candle_pixel:896673726161117245>')
        .setImage(`attachment://${attachment.name}`)
        .setFooter({text:`Задав команду ${message.author.username}`,iconURL: message.author.displayAvatarURL()})
        await message.reply({embeds:[embed],files: [attachment]})
        

     }
 }