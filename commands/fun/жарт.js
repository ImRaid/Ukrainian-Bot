const joke = require("one-liner-joke");
const Discord = require("discord.js");
const translate = require('@iamtraction/google-translate');
module.exports = {
  desc: "Рандомний жарт.",
  run: async (client, message, args) => {
 translate(joke.getRandomJoke().body, { to: 'uk' }).then(res => {
        let jEmbed = new Discord.EmbedBuilder()
      .setTitle('Жарт')
      .setDescription(res.text)
      .setColor("Random") 
    message.channel.send({embeds:[jEmbed]})
	
 }) 
} 
}