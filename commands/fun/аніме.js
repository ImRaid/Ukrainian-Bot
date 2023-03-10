const { EmbedBuilder } = require('discord.js')
const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = {
    desc: "Рандом аніме гіф.",
    run: async(client, message, args) => {
      const search = `Anime` + args || 'Anime' 
 let url = `https://g.tenor.com/v1/search?q=${search}}&key=${process.env.tenor}&limit=1000`;
        let response = await fetch(url);
        let json = await response.json();
        const index = Math.floor(Math.random() * json.results.length);   

        const attachment = new Discord.AttachmentBuilder(json.results[index].media[0].gif.url, { name:'anime.gif', description:"Аніме зображення від Ukrainian Bot"});
        //lol vono z imagege robilo axaxaxa
  const embed = new EmbedBuilder()
  .setTitle('Аніме картинка <:owoSenpai:902905212908490802>')
.setColor('Random')
.setImage('attachment://anime.gif')
.setFooter({text:`Задав ${message.author.username}`, iconURL:message.author.displayAvatarURL()}) 
message.channel.send({embeds:[embed], files:[attachment]})
  }
}