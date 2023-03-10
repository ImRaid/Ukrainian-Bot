const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
  desc: "Додає або очищає вашу біографію!",
  run: async(client, message, args, member) => {
  const jon = args[0]
    if(jon === 'додати'){
    if(message.mentions.users.first()){
      return message.channel.send("Ти не можеш поставити біографію комусь іншому!");
    }
       const joined = args.slice(1).join(" ");
     
      
          
        if (!joined) return message.channel.send('**Вкажи щось про себе!**');

      
       
         db.set(`info_${message.author.id}`, joined);
       

      const embed = new Discord.EmbedBuilder()
      .setTitle('Про себе')
      .setDescription(`Відтепер ваш опис: ${joined}`)
      .setColor(`Random`)
message.channel.send({embeds:[embed]})
    }else if(jon === 'очистити'){
         db.delete(`info_${message.author.id}`);
         const embed2 = new Discord.EmbedBuilder()
      .setTitle('Про себе')
      .setDescription(`Ваш опис анульовано!`)
      .setColor(`Random`)
message.channel.send({embeds:[embed2]})
 return;
    } else if (jon !== "очистити" || "додати") return message.channel.send('Вкажи, що ти хочеш зробити з своїм про себе. \nua! просебе додати/очистити "вказуємо свій новий опис"')
  }
}
