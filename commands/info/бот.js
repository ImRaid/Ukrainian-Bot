const Discord = require('discord.js')
const { ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js')
const {version} = require("../../settings/info.json")

let os = require('os');
let cpuStat = require("cpu-stat");



module.exports = {
  name: 'бот',
  desc: "Інформація про мене(бота).",
  run: async(client, message, args, prefix) => {
      let cpuLol;
        cpuStat.usagePercent(async function (err, percent, seconds) {
            if (err) {
                return console.log(err);
            }
let guilds = client.guilds.cache.size;
       let members = client.guilds.cache.map((guild) => guild.memberCount).reduce((a, c) => a + c);
      
       const aern = client.users.cache.get('736273484870713365').tag
       const raid = client.users.cache.get('948961551954632714').tag
       let bt1 = new ButtonBuilder()
       .setStyle('Link')
       .setLabel('Сервер Підтримки 🤖')
       .setURL("https://discord.gg/sEYh2x8WUk")

       let bt2 = new ButtonBuilder()
       .setStyle('Link')
       .setLabel('Додати мене 👍')
       .setURL("https://discord.com/api/oauth2/authorize?client_id=889507614755528765&permissions=8&scope=bot%20applications.commands")
        
       let row = new ActionRowBuilder()
            .addComponents(bt1, bt2)

    let embed = new EmbedBuilder()
    .setTitle('Інформація про бота **Ukrainian Bot**')
    .setDescription(`Бота робили дві людини.\n **${raid}** та **${aern}**.`)
   .addFields(
    { name: `Пінг:`, value: `${Date.now() - message.createdTimestamp}` },
   )
   .addFields(
    { name: `Команда допомоги:`, value: `ua! допомога` },
    { name:"Версія:",value:`\`${version}\``}
   )
   .addFields(
    { name: `Серверів:`, value: `${guilds}` },
    { name: `Учасників:`, value: `${members}` }
   )
   .addFields(
    { name: `Статистика **CPU**:`, value: `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\nПродуктивність процесора: ${percent.toFixed(2)}%\n${os.platform()}\`\`\`` }
   )           
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("Random")

    message.channel.send({
        embeds:[embed],
      components:[row]
                         })

        })
  }
}