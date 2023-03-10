const discord = require('discord.js')
const db = require("quick.db")
async function sendLog(guild,embed,attachment) {
  
    if(!db.get(`modlog_${guild.id}`)) return;    //а меседж ти звідки береш? передаю 
    let webhook = await guild.fetchWebhooks();
    webhook = webhook.find(x => x.name === "Ukrainian Bot log");
    if(!webhook) return;
        if(attachment == null){
            webhook.send({embeds:[embed]});
        }else{
            webhook.send({ embeds: embed, files: [attachment] });
            }
}
module.exports = {sendLog}