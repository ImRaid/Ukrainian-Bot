const fs = require('fs')
const {EmbedBuilder} = require('discord.js')
const request = require('request')
const Parser = require('rss-parser')
const parser = new Parser()
async function YouTubeCheck(client) {
    fs.readFile("./yt_channels.json", "utf-8", async function(error,data) {
      if(error) {
        console.log(error)
      }
      let yt = JSON.parse(data)
      for(guild in yt) {
        for( ch in yt[`${guild}`].channels){
         
          
          request(yt[guild].channels[ch].channel_url, async(error, response, body) => {
           if(error) {console.log(error)}
            if(response.statusCode == 200) {

            const data = await parser.parseString(body)
            
           
            const latestVideo = data.items[0];
            if (latestVideo){
            const videoLink = latestVideo.link;
            const videoName = latestVideo.title;
            yt[guild].channels[ch].lastvideo_url = yt[guild].channels[ch].lastvideo_url || null;  
           if(videoLink !== yt[guild].channels[ch].lastvideo_url) {
            const g = await client.guilds.fetch(guild)
            const channel = await g.channels.fetch(yt[guild].channels[ch].channel)
            await channel.send(yt[guild].channels[ch].message.replace("{channel}", yt[guild].channels[ch].channel_name).replace("{name}", videoName).replace("{url}", videoLink))
            yt[guild].channels[ch].lastvideo_url = videoLink
            fs.writeFile("./yt_channels.json", JSON.stringify(yt, null, 1), async(error) => {
              if(error) console.log(error)
            } )
           }
          }
          }
         })
        }
      }
      
    })
  }
  module.exports = {YouTubeCheck}