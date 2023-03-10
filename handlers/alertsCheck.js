const fs = require('fs')
const {EmbedBuilder} = require('discord.js')
const fetch = require('node-fetch')
const moment = require('moment');
async function AlertsCheck(client){
 let url = `https://emapa.fra1.cdn.digitaloceanspaces.com/statuses.json`;
 let active = [];
 let channel;
 


 fetch(url).then(res => res.json()).then(body => {
    
    fs.readFile('./check.json','utf-8',async function(error,data) {
        if(error) {
          console.log(error)
        }
       
        let json = JSON.parse(data)
        for(states in body.states){
           
            if (body.states[states].enabled !== json.states[states].enabled){
             
               if(body.states[states].enabled == false && json.states[states].enabled == true){

                let date = moment(body.states[states].disabled_at)
                let embed = new EmbedBuilder()
                .setTitle(`🟢 ${date.format('HH:mm')} Відбій тривоги в ${states}.`)
                .addFields(
                      {name:`${states}`,value:  `Слідкуйте за подальшими повідомленнями.`}
                    )
                .setColor("Green")
                .setFooter({text:`Ukrainian Bot`, iconURL:client.user.displayAvatarURL()})
                fs.readFile('./alerts.json','utf-8',async function(error,data1) {
                    let dat = JSON.parse(data1)
                    for(guild in dat) {
                      
                let g = await client.guilds.fetch(`${guild}`)
                let channel = await  g.channels.fetch(`${dat[`${guild}`].channel}`)          
                channel.send({embeds:[embed]})
                        
                    }
                })
                   json.states[states].enabled = false;
                }else if(body.states[states].enabled == true && json.states[states].enabled == false){
                    let date = moment(body.states[states].enabled_at)
                    let embed = new EmbedBuilder()
                    .setTitle(`🔴 ${date.format('HH:mm')} Повітряна тривога в ${states}.`)
                .addFields(
                      {name:`${states}`,value:  `Слідкуйте за подальшими повідомленнями.`}
                   )
                    .setColor("Red")
                    .setFooter({text:`Ukrainian Bot`, iconURL:client.user.displayAvatarURL()})
                    fs.readFile('./alerts.json','utf-8',async function(error,data1) {
                        let dat = JSON.parse(data1)
                        for(guild in dat) {
                          console.log(guild)
                    let g = await client.guilds.fetch(`${guild}`)
                    let channel = await  g.channels.fetch(`${dat[`${guild}`].channel}`)          
                    channel.send({embeds:[embed]})
                            
                        }
                    })
                    json.states[states].enabled = true;
                }
            }
            for(disc in body.states[states].districts){
                if (body.states[states].districts[disc].enabled !== json.states[states].districts[disc].enabled){
                    console.log(body.states[states].districts[disc].enabled)
                    console.log(json.states[states].districts[disc].enabled)
                    if(body.states[states].districts[disc].enabled == false && json.states[states].districts[disc].enabled == true ){
                     let date = moment(body.states[states].districts[disc].disabled_at )
                     let embed = new EmbedBuilder()
                     if(body.states[states].districts[disc].disabled_at==null){
                        embed.setTitle(`🟢 Відбій тривоги в ${disc}.`)}
                     else{
                        embed.setTitle(`🟢 ${date.format('HH:mm')} Відбій тривоги в ${disc}.`)
                     }
                     embed.addFields(
                           {name:`${states}`,value:  `Слідкуйте за подальшими повідомленнями.`}
                         )
                    embed.setColor("Green")
                    embed.setFooter({text:`Ukrainian Bot`, iconURL:client.user.displayAvatarURL()})
                     fs.readFile('./alerts.json','utf-8',async function(error,data1) {
                        let dat = JSON.parse(data1)
                        for(guild in dat) {
                          
                    let g = await client.guilds.fetch(`${guild}`)
                    let channel = await  g.channels.fetch(`${dat[`${guild}`].channel}`)          
                    channel.send({embeds:[embed]})
                            
                        }
                    })
                    json.states[states].districts[disc].enabled = false;
                       
                     }else if(body.states[states].districts[disc].enabled == true && json.states[states].districts[disc].enabled == false){
                         let date = moment(body.states[states].districts[disc].enabled_at)
                         let embed = new EmbedBuilder()
                         .setTitle(`🔴 ${date.format('HH:mm')} Повітряна тривога в ${disc}.`)
                     .addFields(
                           {name:`${states}`,value:  `Слідкуйте за подальшими повідомленнями.`}
                        )
                         .setColor("Red")
                         .setFooter({text:`Ukrainian Bot`, iconURL:client.user.displayAvatarURL()})
                         fs.readFile('./alerts.json','utf-8',async function(error,data1) {
                            let dat = JSON.parse(data1)
                            for(guild in dat) {
                              
                        let g = await client.guilds.fetch(`${guild}`)
                        let channel = await  g.channels.fetch(`${dat[`${guild}`].channel}`)          
                        channel.send({embeds:[embed]})
                                
                            }
                        })
                         json.states[states].districts[disc].enabled = true;
                     }
            }
        }
 
    }
        fs.writeFile("./check.json", JSON.stringify(json, null, 1), async(error) => {
            if(error) console.log(error)
          } )
    })
})
}
module.exports = {AlertsCheck}