const Discord = require('discord.js')
const { EmbedBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')
const rps = ['ножиці','камінь', 'папір'];
const res = [':v:',':fist:', ':raised_hand:'];
module.exports.run = async (client, message, args) => {
      let button1 = new Discord.ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setLabel('Ножиці') 
      .setCustomId("btn1");
      let button2 = new Discord.ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setLabel('Камінь') 
      .setCustomId('btn2');
      let button3 = new Discord.ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setLabel('Папір') 
      .setCustomId('btn3');

      let row = new ActionRowBuilder()
            .addComponents(button1, button2, button3)
        
			
    const embed1 = new EmbedBuilder()
    .setTitle('Натисни на кнопку, яка означає твій вибір!')
    message.channel.send({embeds:[embed1], components:[row]})
    const filter = i => i.user.id === message.author.id
    const collector = message.channel.createMessageComponentCollector({filter, time: 30000})
    collector.on('collect', async i => {
        let userChoice;
        if(i.customId === "btn1") userChoice = 1
        else if(i.customId === "btn2") userChoice = 2
        else if(i.customId === "btn3") userChoice = 3
        const botChoice = Math.floor(Math.random()*3);
        let result;
        if (userChoice === botChoice) result = 'Нічия!';
        else if (botChoice > userChoice || botChoice === 0 && userChoice === 2) result = 'Ти програв :(';
        else result = `${message.member.displayName} переміг!`;
        const embed = new EmbedBuilder()
            .setTitle(`${result}`)
            .addFields({name:'Ти вибрав:', value:res[userChoice]})
            .addFields({name:'Я вибрав:', value:res[botChoice]})
            .setFooter({text:'Ukrainian Bot', icon:client.user.displayAvatarURL()})
            .setColor("Random");
        await i.update({embeds:[embed], components:[]})
    })
    
  }

  module.exports.desc = "Зіграй в Камінь, ножиці, папір зі мною!";