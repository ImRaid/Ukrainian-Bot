const { EmbedBuilder, ChannelType, Embed, PermissionFlagsBits } = require('discord.js')
const { ErrorBuilder } = require('../../handlers/errorBuilder.js')
const db = require('quick.db')

module.exports.run = async(client, message, args) => {
    await message.guild.channels.create({ name: "Приватні канали Ukrainian Bot", type: ChannelType.GuildCategory }).then(async({id}) => {
        await message.guild.channels.create({ name: "Заходь сюди", type: ChannelType.GuildVoice, parent: id, permissionOverwrites: [ { id: client.user.id, allow: [PermissionFlagsBits.MoveMembers]}]}).then(async(channel) => {
            await message.reply({
                embeds:[
                    new EmbedBuilder()
                        .setTitle(`Я успішно створив систему приватних каналів на цьому сервері`)
                        .setDescription(`Ти можеш вільно міняти назву каналу та категорії, якщо тобі це необхідно`)
                        .setColor("Random")
                        .setFooter({text: 'Ukrainian Bot', iconURL:client.user.displayAvatarURL()})
                                    ]
            })
            db.set(`private_channels_guild_${message.guild.id}`, channel.id)
        })
    })
}