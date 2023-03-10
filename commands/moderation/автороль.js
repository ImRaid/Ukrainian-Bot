const db = require("quick.db");
const Discord = require('discord.js')
const { PermissionsBitField } = require('discord.js')

module.exports = {
  desc: "Поставити роль, яка буде видаватися користувачу при вході на сервер.",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply("*У вас немає необхідних прав!**");
  }
    

    let role =
      message.mentions.roles.first() ||
      client.guilds.cache.get(message.guild.id).roles.cache.get(args[0]) ||
      message.guild.roles.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role) {
        const embed = new Discord.EmbedBuilder().setTitle(`Помилка`).setDescription("**Будь ласка, вкажіть правильну роль!**")
      return message.reply({embeds:[embed]});
    }
  try{
    let q = db.fetch(`roless_${message.guild.id}_count`)||0

      let data = {
      number: q+1 ,
      give: role.id
    }
       let cmdx = db.fetch(`roless_${message.guild.id}`)
       console.log(cmdx)

    let database = db.get(`roless_${message.guild.id}`)

if (database !== null){
    if(database && database.find(x => x.give === role.id)) {message.channel.send("Ця роль вже додана!")
    return;}
       
}
        db.push(`roless_${message.guild.id}`, data);
        db.add(`roless_${message.guild.id}_count`, 1)
    const embed = new Discord.EmbedBuilder().setTitle('Сповіщення').setDescription(`**${role.name} Успішно встановлено як Авто роль!**`)
        message.channel.send({embeds:[embed]});
 
}catch(e){
    console.log(e)
}
  }
}