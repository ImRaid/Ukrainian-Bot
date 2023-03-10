const { EmbedBuilder, PermissionsBitField} = require('discord.js');
const {ErrorBuilder} = require("../../handlers/errorBuilder")
const fs = require("fs");
let json = "./voting.json" //не так fs читає з індексу


module.exports = {
	desc:"",
    aliases:["опитування"],
	run: async (client, message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return ErrorBuilder(message,"відповідь",null,`Ви не маєте дозволів для виконання цієї дії ${message.author.username}!`)
        if(!args[0]) return ErrorBuilder(message,"відповідь", null, "Вкажіть тему опитування опитування!")
        let final;
          final = "🇦 | ░░░░░░░░░░ [ 0 • 0% ]\n🇧 | ░░░░░░░░░░ [ 0 • 0% ]\n"
          let pollData = JSON.parse(fs.readFileSync(json,'utf-8'));
        let vart;
        let cn = 2;
        baza = args.slice(0).join(" ").split("|")
        const theme = baza[0]
            const param1 = baza[1]
            const param2 = baza[2]
            const param3 = baza[3]
            const param4 = baza[4]
            const param5 = baza[5]
              vart = `🇦 | ${param1}\n🇧 | ${param2}\n`
            if (param3) {
              if(param4) {
                if(param5) {
                  cn = 5;
                  final = "🇦 | ░░░░░░░░░░ [ 0 • 0% ]\n🇧 | ░░░░░░░░░░ [ 0 • 0% ]\n🇨 | ░░░░░░░░░░ [ 0 • 0% ]\n🇩 | ░░░░░░░░░░ [ 0 • 0% ]\n🇪 | ░░░░░░░░░░ [ 0 • 0% ]"
                 vart = `🇦 | ${param1}\n🇧 | ${param2}\n🇨 | ${param3}\n🇩 | ${param4}\n🇪 | ${param5} `
                } else {
                  final = "🇦 | ░░░░░░░░░░ [ 0 • 0% ]\n🇧 | ░░░░░░░░░░ [ 0 • 0% ]\n🇨 | ░░░░░░░░░░ [ 0 • 0% ]\n🇩 | ░░░░░░░░░░ [ 0 • 0% ]"
                  vart = `🇦 | ${param1}\n🇧 | ${param2}\n🇨 | ${param3}\n🇩 | ${param4}`
                  cn = 4;
                }
              } else {
                final = "🇦 | ░░░░░░░░░░ [ 0 • 0% ]\n🇧 | ░░░░░░░░░░ [ 0 • 0% ]\n🇨 | ░░░░░░░░░░ [ 0 • 0% ]"
                vart = `🇦 | ${param1}\n🇧 | ${param2}\n🇨 | ${param3}`
                cn = 3;
              }
              
            }
            let embed = new EmbedBuilder()
            .setTitle("**Опитування**")
            .setColor(`#00FF00`)
            .addFields(
                {name:"**Тема:**", value:theme, inline:false},
                {name:"Варіанти:", value:vart, inline:false},
                {name:'Поточний стан', value:final, inline:false})
            .setFooter({text:`Опитування закриється, якщо ${message.author.tag} поставить реакцію ❌`})
        message.channel.send(`✅ Опитування було успішно створено!`, { ephemeral: true });
        const msg = await message.channel.send({embeds:[ embed] });
            await msg.react("🇦");
            await msg.react("🇧");
            if (param3) {
              await msg.react("🇨")
              if(param4) {
                await msg.react("🇩")
                if(param5) {
                  await msg.react("🇪")
                }
              }
            }
            await msg.react("❌")

        let newpollData = {
          [msg.id]: {
            "owner": message.author.id,
            "_emoji_count": cn
          }
        }

       
       fs.writeFile(json, JSON.stringify( { ...pollData, ...newpollData}, null, 1), (error) => {
        if (error) {
          console.error(error);
        
        }
      });
    }
    
    }