const fs = require('fs')
    const {EmbedBuilder, ReactionManager, Embed} = require('discord.js');
module.exports = async(client,reaction, user) => {
    if(user.bot) return;
    reaction.message.channel.messages.fetch(reaction.message.id).then(async({id}) => {
    fs.readFile("./voting.json", "utf-8", async function(err, jsonString) {
    if (err) return console.log(err)
    let data = JSON.parse(jsonString)
    if(data[`${id}`]) {
       if (reaction._emoji.name == "🇦"||reaction._emoji.name == "🇧"||reaction._emoji.name == "🇨"||reaction._emoji.name == "🇩"||reaction._emoji.name == "🇪") { 
            await reaction.message.channel.messages.fetch(reaction.message.id).then(async(message) => {
                
                let count1 = 0;
                let count2 = 0;
                let count3 = 0;
                let count4 = 0;
                let count5 = 0;
                let percent1 = 0;
                let percent2 = 0;
                let percent3 = 0;
                let percent4 = 0;
                let percent5 = 0;
                let desc = "";
                count1 = message.reactions.cache.get("🇦").count - 1;
                count2 = message.reactions.cache.get("🇧").count - 1;
                if (message.reactions.cache.get("🇨")) {
                    count3 = message.reactions.cache.get("🇨").count - 1;
                }
                if (message.reactions.cache.get("🇩")) {
                    count4 = message.reactions.cache.get("🇩").count - 1;
                }
                if (message.reactions.cache.get("🇪")) {
                   count5 = message.reactions.cache.get("🇪").count - 1;
                } 
               
                
             
        
                let total = count1 + count2 + count3 + count4 + count5;
                if (total !== 0) {
                    percent1 = (count1 / total) * 100;
                    percent2 = (count2 / total) * 100;
                    if (count3 !== null) {
                        percent3 = (count3 / total) * 100;
                    }
                    if (count4 !== null) {
                        percent4 = (count4 / total) * 100;
                    }
                    if (count5 !== null) {
                        percent5 = (count5 / total) * 100;
                    }
                }
        
                console.log(count1, percent1.toFixed(2));
                console.log(count2, percent2.toFixed(2));
                console.log(count3, percent3.toFixed(2));
                console.log(count4, percent4.toFixed(2));
                console.log(count5, percent5.toFixed(2));  
              
                if(data[message.id]._emoji_count == 2){
                    desc= `🇦 | ${await replace(Math.floor(percent1/10))} [ ${count1} • ${percent1.toFixed(2)}% ]\n🇧 | ${await replace(Math.floor(percent2/10))} [ ${count2} • ${percent2.toFixed(2)}% ]\n`   
                    } else if(data[message.id]._emoji_count == 3) {
                        desc= `🇦 | ${await replace(Math.floor(percent1/10))} [ ${count1} • ${percent1.toFixed(2)}% ]\n🇧 | ${await replace(Math.floor(percent2/10))} [ ${count2} • ${percent2.toFixed(2)}% ]\n🇨 | ${await replace(Math.floor(percent3/10))} [ ${count3} • ${percent3.toFixed(2)}% ]\n`   
                    } else if(data[message.id]._emoji_count == 4) {
                        desc= `🇦 | ${await replace(Math.floor(percent1/10))} [ ${count1} • ${percent1.toFixed(2)}% ]\n🇧 | ${await replace(Math.floor(percent2/10))} [ ${count2} • ${percent2.toFixed(2)}% ]\n🇨 | ${await replace(Math.floor(percent3/10))} [ ${count3} • ${percent3.toFixed(2)}% ]\n🇩 | ${await replace(Math.floor(percent4/10))} [ ${count4} • ${percent4.toFixed(2)}% ]\n`   
                        } else if(data[message.id]._emoji_count == 5) {
                            desc= `🇦 | ${await replace(Math.floor(percent1/10))} [ ${count1} • ${percent1.toFixed(2)}% ]\n🇧 | ${await replace(Math.floor(percent2/10))} [ ${count2} • ${percent2.toFixed(2)}% ]\n🇨 | ${await replace(Math.floor(percent3/10))} [ ${count3} • ${percent3.toFixed(2)}% ]\n🇩 | ${await replace(Math.floor(percent4/10))} [ ${count4} • ${percent4.toFixed(2)}% ]\n🇪 | ${await replace(Math.floor(percent5/10))} [ ${count5} • ${percent5.toFixed(2)}% ]\n`
                        }
                    
console.log(desc)//дс
                await message.edit({
                    embeds:[
                        new EmbedBuilder()
                        .setTitle(
                            message.embeds[0].data.title
                        )
                        .setColor(
                            message.embeds[0].data.color
                        )
                        .addFields(
                            {
                                name: message.embeds[0].data.fields[0].name, value: message.embeds[0].data.fields[0].value, inline:false
                            },
                            {
                                name: message.embeds[0].data.fields[1].name, value: message.embeds[0].data.fields[1].value, inline:false
                            },
                            {
                                name: "Результат", value: desc
                            },
                            
                        )
                        .setFooter({text:message.embeds[0].data.footer.text})
                    ]//Dc
                })
            });
          
        }
    }
})
})
}
async function replace(number){
    let txt = '░░░░░░░░░░';
    for (let i = 0; i <number;i++){
        txt = txt.replace('░','█')
      
    }
    return txt;
}   