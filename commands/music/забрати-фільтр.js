const Discord = require('discord.js')
const { ErrorBuilder } = require('../../handlers/errorBuilder.js')
const FiltersSettings = require("../../settings/filters.json");
module.exports = {
    desc: "Забрати фільтр з треку",
    run: async(client, message, args) => {
        if(!message.member.voice.channel) return ErrorBuilder(message,'відповідь',"Помилка!","Для початкузайди у голосовий канал!")
        if (message.guild.channels.cache.some(channel => (channel.type === 'voice' && channel.members.has(client.user.id)))) {
            return ErrorBuilder(message,'відповідь',null, 'Я не знаходжуся у іншому каналі.');
        }
        if (!args[0]) return ErrorBuilder(message,'відповідь','Будь ласка, напиши пісню!', 'Ось список існуючих фільтрів: \`перевернути\`, \`моно\`, \`басбуст\`, \`швидкість\`, \`караоке\`, \`нічний\`')
        const queue = client.distube.getQueue(message)
		if (!queue || !queue.songs || queue.songs.length == 0) return ErrorBuilder(message,"відповідь","Помилка!",`Я зараз нічого не граю`)
       
        if(args[0].toString().toLowerCase() === "швидкість") {
            if(!args[1]) return ErrorBuilder(message,"відповідь",null,`Вкажи швидкість музики.`) 
                    
                    if(isNaN(args[1])) return ErrorBuilder(message,"відповідь",null,`Це не число.`) 
                    if(args[1] > 2 || args[1] < 1)  return ErrorBuilder(message,"відповідь",null,`Вкажи швидкість від 1 для 2`) 
                    FiltersSettings.customspeed = `atempo=${args[1]}`;
				    client.distube.filters = FiltersSettings;
                    if (!queue.filters.has("customspeed")) {
                        await queue?.filters?.remove(["customspeed"]);
                    }
                    await queue?.filters?.remove(["customspeed"]);
                     let embed1 = new Discord.EmbedBuilder()
                     .setTitle('Сповіщення!')
                     .setDescription(`Забрано фільтр \`швидкість\` для пісні. Швидкість: \`x${args[1]}\``)                          
                     .setColor("Yellow")
                     .setFooter({text:`Задав ${message.author.tag}`,iconURL:message.author.displayAvatarURL({dynamic: true})})
                     await message.reply({embeds:[embed1]})
                
            }else if(args[0].toString().toLowerCase() === "моно"){
                    if (!queue?.filters?.has("haas")) return ErrorBuilder(message,"відповідь",null,`В тебе не ввімкнений \`моно\` фільтр!`)
                     await queue?.filters?.remove("haas");
                     let embed = new Discord.EmbedBuilder()
                     .setTitle('Сповіщення!')
                     .setDescription(`Забрано фільтр \`моно\` для пісні`)                          
                     .setColor("Yellow")
                     .setFooter({text:`Задав ${message.author.tag}`,iconURL:message.author.displayAvatarURL({dynamic: true})})

                     await message.reply({embeds:[embed]})
            }else if(args[0].toString().toLowerCase() === "перевернути"){
                    if (!queue?.filters?.has("reverse")) return ErrorBuilder(message,"відповідь",null,`В тебе не ввімкнений \`перевернути\` фільтр!`)
                    await queue?.filters?.remove("reverse");
                    let embed2 = new Discord.EmbedBuilder()
                    .setTitle('Сповіщення!')
                    .setDescription(`Забрано фільтр \`перевернути\` для пісні`)                          
                    .setColor("Yellow")
                    .setFooter({text:`Задав ${message.author.tag}`,iconURL:message.author.displayAvatarURL({dynamic: true})})
                    await message.reply({embeds:[embed2]})
            }
            else if(args[0].toString().toLowerCase() === "караоке"){
                    if (!queue?.filters?.has("karaoke")) return ErrorBuilder(message,"відповідь",null,`В тебе не ввімкнений \`караоке\` фільтр!`)
                     await queue?.filters?.remove("karaoke");
                     let embed3 = new Discord.EmbedBuilder()
                     .setTitle('Сповіщення!')
                     .setDescription(`Забрано фільтр \`караоке\` для пісні`)                          
                     .setColor("Yellow")
                     .setFooter({text:`Задав ${message.author.tag}`,iconURL:message.author.displayAvatarURL({dynamic: true})})
                     await message.reply({embeds:[embed3]})
            }
            else if(args[0].toString().toLowerCase() === "басбуст"){
                    if (!queue?.filters?.has("bassboost")) return ErrorBuilder(message,"відповідь",null,`В тебе не ввімкнений \`басбуст\` фільтр!`)
                     await queue?.filters?.remove("bassboost");
                     let embed4 = new Discord.EmbedBuilder()
                     .setTitle('Сповіщення!')
                     .setDescription(`Забрано фільтр \`басбуст\` для пісні`)                          
                     .setColor("Yellow")
                     .setFooter({text:`Задав ${message.author.tag}`,iconURL:message.author.displayAvatarURL({dynamic: true})})
                     await message.reply({embeds:[embed4]})
            }else if(args[0].toString().toLowerCase() === "нічний"){
                    if (!queue?.filters?.has("nightcore")) return ErrorBuilder(message,"відповідь",null,`В тебе не ввімкнений \`нічний\` фільтр!`)
                     await queue?.filters?.remove("nightcore");
                     let embed5 = new Discord.EmbedBuilder()
                     .setTitle('Сповіщення!')
                     .setDescription(`Забрано фільтр \`нічний\` для пісні`)                          
                     .setColor("Yellow")
                     .setFooter({text:`Задав ${message.author.tag}`,iconURL:message.author.displayAvatarURL({dynamic: true})})
                     await message.reply({embeds:[embed5]})
            }
            if(args[0].toString().toLowerCase() !== `моно` && 
                args[0].toString().toLowerCase() !== `швидкість`&& 
                args[0].toString().toLowerCase() !== `перевернути`&& 
                args[0].toString().toLowerCase() !== `караоке`&& 
                args[0].toString().toLowerCase() !== `басбуст` &&
                 args[0].toString().toLowerCase() !== `нічний`) {
                    ErrorBuilder(message,"відповідь","Помилка",'Такого фільтру не існує! Ось список існуючих фільтрів: \`перевернути\`, \`моно\`, \`басбуст\`, \`швидкість\`, \`караоке\`, \`нічний\`')
            }
        }
               
               
               
              
              
}
