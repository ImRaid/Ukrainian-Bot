const {EmbedBuilder} = require('discord.js')

module.exports = {
desc:'',
  run: async (client, message, args) => {    
      let user = message.guild.members.cache.random();
      const emb = new EmbedBuilder()
      .setTitle("Результати")
        .setDescription(`Аватар користувача **${user.user.username}\n------------\n**`)
       .setImage(user.user.displayAvatarURL({format: 'png', size: 2048}))
       .setFooter({text:`Задав ${message.author.username}`,iconURL: message.author.displayAvatarURL()})
       .setColor("Random")
        await message.reply({embeds:[emb]})
  }}