const discord = require('discord.js');
const { sendLog } = require('../handlers/logger.js');
module.exports = async(client,role,guild) => {
    let webhook = await role.guild.fetchWebhooks();     
    webhook = webhook.find(x => x.name === "Ukrainian Bot log");
    let emb = new discord.EmbedBuilder()
    .setTitle('**Сповіщення**')
    .setColor('Green')
    .setDescription(`**Створена роль!**`)
    .addFields(
        {name:`Роль:`, value:`${role}`, inline:true},
        {name:`Назва:`, value:`${role.name}`, inline:true},
        {name:`Колір:`, value:`${role.hexColor}`, inline:true},
        {name:`ID:`, value:`${role.id}`,inline:true},
        {name:`Позиція:`, value:`${role.position}`,inline:true})
    .setTimestamp(role.createdAt)
    sendLog(role.guild,emb)
}