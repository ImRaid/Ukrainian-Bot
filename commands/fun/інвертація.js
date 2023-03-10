const {EmbedBuilder,AttachmentBuilder} = require("discord.js");
const AmeClient = require("amethyste-api");
module.exports = {
    desc:"",
  run: async (client, message, args) => {
    
    const mb = message.mentions.users.first() || message.author;
    let AmeAPI = new AmeClient(process.env.ImageAPI);
    const buffer = await AmeAPI.generate("invert", { url: mb.displayAvatarURL({size:512}).replace('.webp', '.png')});
    const attachment = new AttachmentBuilder(buffer, {name:"invert.png"})
    let emb = new EmbedBuilder()
    .setTitle('АААА, ЦІ КОЛЬОРИ НЕЗВИЧНІ ')
    .setImage(`attachment://${attachment.name}`)
    .setColor("Random")
    .setFooter({text:"Ukrainian Bot", iconURL:client.user.displayAvatarURL()})
    await message.reply({
        embeds:[emb],
        files: [attachment]
    })                                
   
      }
};
