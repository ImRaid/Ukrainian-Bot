require('dotenv').config()
const discord = require('discord.js')
const { GatewayIntentBits, Partials, DiscordAPIError, ButtonStyle } = require('discord.js')
const fs = require('fs')
const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const ffmpeg = require("ffmpeg-static");
const {ErrorBuilder} = require(`./handlers/errorBuilder`)
const{EmbedBuilder} = require(`discord.js`)
const db = require(`quick.db`)
const ascii = require('ascii-table')
let table = new ascii("Commands");
const PlayerMap = new Map()
const client = new discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
      ],
      partials: [
        Partials.GuildMember,
        Partials.User,
        Partials.Message,
        Partials.Channel
      ],
      allowedMentions: {
        parse: [
          'users',
          'everyone',
        ],
        repliedUser: true,
      },
      presence: {
        status: 'idle'
      },
})

client.distube = new DisTube(client, {
  leaveOnStop: false,
  leaveOnEmpty: true,
  leaveOnFinish: true,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
})
client.distube.on('finish', queue => queue.textChannel.send('Пісня закінчилася і я покинув канал.'))
client.distube
  .on('playSong', async(queue, song) => {
    try {
    var theQueue = client.distube.getQueue(queue.id)
    var data = receiveQueueData(theQueue, song)
   
    let currentSongPlayMsg = await queue.textChannel.send(data).then(msg => {
      PlayerMap.set(`currentmsg`, msg.id);
      return msg;
    })
   
    var collector = currentSongPlayMsg.createMessageComponentCollector({
      filter: (i) => i.isButton() && i.user,
      time: song.duration > 0 ? song.duration * 1000 : 600000
    }); 
    let lastEdited = false;

    collector.on('collect', async(int) => {
      await int.deferUpdate()
      switch(int.customId) {
        case "play":
          if(!theQueue.paused) {
            return currentSongPlayMsg.reply({
              content: "Музика на даний момент не знаходиться на паузі",
              ephemeral: true
            })
          }
          client.distube.resume(currentSongPlayMsg.guild.id)
          break;
        case "pause":
          if(theQueue.paused) {
            return currentSongPlayMsg.reply({
              content: "Музика на даний момент знаходиться на паузі",
              ephemeral: true
            })
          }
          client.distube.pause(currentSongPlayMsg.guild.id)
          break;
        case "turnoff":
          theQueue.setVolume(0)
          break;
        case "fullturnon":
          theQueue.setVolume(100)
          break;
        case "turnon":
          theQueue.setVolume(50)
          break;
      }
    })

    try{clearInterval(songEditInterval)}catch(e){}
    songEditInterval = setInterval(async () => {
      if (!lastEdited) {
        try{
          var data = receiveQueueData(client.distube.getQueue(queue.id), client.distube.getQueue(queue.id).songs[0])
                await currentSongPlayMsg.edit(data).catch((e) => {
                  console.log(e.stack ? String(e.stack).grey : String(e).grey)
                })
        }catch (e){
          clearInterval(songEditInterval)
        }
      }
    }, 5000)


    } catch(e) {
      console.log(e)
    }
    })
  .on('addSong', (queue, song) => {
    queue.textChannel.send(`Додано ${song.name} - \`${song.formattedDuration}\` | Задав: ${song.user} `)
  })
  .on('addList', (queue, song) => {
    queue.textChannel.send(`Додано ${song.name} - \`${song.formattedDuration}\` | Задав: ${song.user} `)
  })

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
       files.forEach((file) => {
       const event = require(`./events/${file}`);
       let eventName = file.split(".")[0];
       client.on(eventName, event.bind(null, client));
       });
    });

client.commands = new discord.Collection()
client.aliases = new discord.Collection()

table.setHeading('Command', ' Load status');
fs.readdirSync("./commands/").forEach(dir => {
  const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
  for(let file of commands){
      let pull = require(`./commands/${dir}/${file}`);
      let commandName = file.split('.')[0]
      client.commands.set(commandName, pull);
      if(pull.desc){
          table.addRow(file,'✅')
      } else {
          table.addRow(file, '❌ -> Missing a desc is not a string.')
      }if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias,  commandName))
  }

})
console.log(table.toString());
    const Commands = [];

client.on("messageCreate", (message) => {
  fs.readFile(`./count/guilds.json`,`utf-8`, async function(error,data) {
    if(error) {
      console.log(error)
    }

  })
 let count = db.get(`count_${message.guild.id}`)
    if(message.channel.id === db.get(`count_${message.guild.id}`)) {
  let current = db.get(`currentcount_${message.guild.id}`);
      if(Number(message.content) === current + 1) {
          count++
          db.add(`currentcount_${message.guild.id}`, 1)
          if(!db.get(`usercount_${message.author.id}_${message.guild.id}`)) {
              db.set(`usercount_${message.author.id}_${message.guild.id}`, 1)
          } else {
           db.add(`usercount_${message.author.id}_${message.guild.id}`, 1)   
          }
message.react('✅')
return;
      } else {
          if(!Number(message.content)) return;
          if(!db.get(`usercountnotright_${message.author.id}_${message.guild.id}`)) {
              db.set(`usercountnotright_${message.author.id}_${message.guild.id}`, 1)
          } else {
           db.add(`usercountnotright_${message.author.id}_${message.guild.id}`, 1)   
          }
      message.react('⛔')
  let embed = new EmbedBuilder()
  .setTitle(`Рахунок`)
  .setColor('Red')
  .setDescription(`Твоє повідомлення: **${message.content}!** А потрібно **${current + 1}**. Наступне число: **1**`)
  .setAuthor({name:`${message.author.username}`, iconURL:message.author.displayAvatarURL()})
  .setFooter({text:`Ukrainian Bot`, iconURL:client.user.displayAvatarURL()})
  .setThumbnail(message.guild.iconURL())
message.reply({embeds:[embed]}).catch(console.error)
db.set(`currentcount_${message.guild.id}`, 0);
return;
}
  
 }
})

client.login(process.env.TOKEN)

function receiveQueueData(newQueue, newTrack, queue, song) {
  let loop = ''
if(newQueue.repeatMode >= 1) {
    loop = 'Ввімкнено'
}else if(newQueue.repeatMode === 0){
    loop = 'Вимкнено'
}
if(!newTrack) return ErrorBuilder(newQueue,"відповідь","Помилка","Пісню не знайдено")

let pause = new discord.ButtonBuilder()
  .setEmoji('⏸')
  .setCustomId('pause')
  .setStyle(ButtonStyle.Danger)
let resume = new discord.ButtonBuilder()
  .setEmoji('▶')
  .setCustomId('play')
  .setStyle(ButtonStyle.Success)
let turnoffsound = new discord.ButtonBuilder()
  .setEmoji('1080212325379883019')
  .setCustomId("turnoff")
  .setStyle(ButtonStyle.Secondary)
let fiftysound = new discord.ButtonBuilder()
  .setEmoji('1080213956423077949')
  .setCustomId("turnon")
  .setStyle(ButtonStyle.Secondary)
let fullsound = new discord.ButtonBuilder()
  .setEmoji("1080213916984037538")
  .setCustomId("fullturnon")
  .setStyle(ButtonStyle.Secondary)
let row = new discord.ActionRowBuilder()
  .addComponents(resume, pause, turnoffsound, fiftysound, fullsound)

const embed = new discord.EmbedBuilder()
.setColor('Random')
.addFields(
{name: `Задав:`, value: `${newTrack.user}`},
{name: `Тривалість пісні:`, value: `${newTrack.formattedDuration}`},
{name:`Пройшло часу:`, value:`${newQueue.formattedCurrentTime}`},
{name: `Звук:`, value: `${newQueue.volume}%`},
{name: `Повторення:`, value: `${loop}`}
)
.setThumbnail(`https://img.youtube.com/vi/${newQueue.songs[0].id}/mqdefault.jpg`)
.setAuthor({name:`${newTrack.name}`})
.setFooter({text:`${newTrack.user.username}`, iconURL:newTrack.user.displayAvatarURL({dynamic:true})})

return {
  embeds: [embed],
  components: [row]
}
 }
