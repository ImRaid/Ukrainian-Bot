const discord = require("discord.js")
const { ChannelType, PermissionFlagsBits } = require('discord.js')
const { sendLog } = require('../handlers/logger.js');
const db = require('quick.db')
const fs = require('fs');
var enable_voice_log = true, enable_joinexit_log = true;
module.exports = async (client,oldState, newState) => {
    if(oldState.channelId === null) {
        if(newState.channelId === db.get(`private_channels_guild_${newState.guild.id}`)) {
            if(newState.channel.parent) {
            await newState.guild.channels.create({
                name: `Канал ${newState.member.user.tag}`,
                type: ChannelType.GuildVoice,
                parent: newState.channel.parentId,
                permissionOverwrites: [
                    {
                        id: newState.guild.roles.everyone,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: newState.member.user.id,
                        allow: [PermissionFlagsBits.Connect,PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Speak, PermissionFlagsBits.ManageChannels]
                    },
                    {
                        id: client.user.id,
                        allow: [PermissionFlagsBits.Connect,PermissionFlagsBits.ViewChannel, PermissionFlagsBits.MoveMembers, PermissionFlagsBits.ManageChannels]
                    }
                ]
            }).then(async(ch) => {
                const channell = newState.guild.channels.cache.find(channel => channel.id === ch.id)
                await newState.member.voice.setChannel(channell.id).catch(e => { console.log(e) })
            })
        } else {
            await newState.guild.channels.create({
                name: `Канал ${newState.member.user.tag}`,
                type: ChannelType.GuildVoice,
                permissionOverwrites: [
                    {
                        id: newState.guild.roles.everyone,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: newState.member.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Speak, PermissionFlagsBits.ManageChannels]
                    }
                ]
            }).then(async(ch) => {
                const channell = newState.guild.channels.cache.find(channel => channel.id === ch.id)
                await newState.member.voice.setChannel(channell.id).catch(e => { console.log(e) })
            })
        }
        } else {
            return
        }
    } else if(newState.channelId === null){
        if(db.get(`private_channels_guild_${oldState.guild.id}`)) {
            if(oldState.channel.parentId === await oldState.guild.channels.cache.find(channel => channel.id === db.get(`private_channels_guild_${oldState.guild.id}`)).parentId && oldState.channelId !== db.get(`private_channels_guild_${oldState.guild.id}`)) {
                if(oldState.channel.members.size === 0) {
                    await oldState.channel.delete()
                }
            }
        }
    }
    if(oldState.channel && newState.channel) {
        if(enable_voice_log == true) {
            if(oldState.member.user.bot) return;
    
            if(newState.channelId !== null && oldState.channelId !== null) {
                if(oldState.channelId !== newState.channelId) {
            
                let embed = new discord.EmbedBuilder()
                .setTitle("Сповіщення")
                .setDescription("**Переключено на інший голосовий канал** 🔊")
                .setColor("Yellow")
                .addFields({name:"Переїхав:", value: `${oldState.member}`, inline:true},
                {name:"Від:", value: `${oldState.channel.name}`, inline:true},
                {name:"До:", value:`${newState.channel.name}`, inline:true} )
                    sendLog(newState.guild,embed)
                }
            }
            else if(oldState.channelId === null) {
                let embed = new discord.EmbedBuilder()
                .setTitle("Сповіщення")
                .setDescription("**Увійшли в голосовий канал** 🔊")
                .setColor("Green")
                .addFields({name:"Увійшов:", value: `${newState.member}`, inline:true},
                {name:"Канал:", value: `${newState.channel.name}`, inline:true})
                    sendLog(newState.guild,embed)
            }
            else if(newState.channelId === null) {
                let embed = new discord.EmbedBuilder()
                .setTitle("Сповіщення")
                .setDescription("**Вийшли з голосового каналу** 🔊")
                .setColor("Red")
                .addFields({name:"Вийшов:", value: `${oldState.member}`, inline:true},
                {name:"Канал:", value: `${oldState.channel.name}`, inline:true})
                    sendLog(oldState.guild,embed)
            }
        }
    }
}