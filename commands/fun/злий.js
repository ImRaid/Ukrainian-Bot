const {EmbedBuilder,AttachmentBuilder} = require("discord.js");

module.exports = {
  run: async (client, message, args) => {
    
    const mb = message.mentions.users.first() || message.author;
    const url = `https://some-random-api.ml/canvas/triggered?avatar=${mb.avatarURL({ dynamic:true }).replace('.webp', '.png')}`;
    console.log(url)

    const attachment = new AttachmentBuilder(url, {name:"triggered.gif"})
    let emb = new EmbedBuilder()
    .setTitle('Чому злишся? <:Triggered:892121855656329256>')
    .setImage(`attachment://${attachment.name}`)
    .setColor("Random")
    .setFooter({text:"Ukrainian Bot", iconURL:client.user.displayAvatarURL()})
    await message.reply({
        embeds:[emb],
        files: [attachment]
    })                                
   
      }
};
