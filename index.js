const env = require('dotenv').config()
const discord = require('discord.js')
const { GatewayIntentBits, Partials } = require('discord.js')
const fs = require('fs')

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

client.on('ready', () => {
    console.log(`${client.user.tag} загружено на сервер`)
    client.user.setActivity(`${client.guilds.cache.size} | ua! допомога`, {type: 'WATCHING'})
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

    fs.readdirSync("./commands/").forEach(dir => {
        const commands = fs.readdirSync(`./commands/${dir}/`).filter(file =>
            file.endsWith(".js")
        )
        for(let file of commands) {
            let command = require(`./commands/${dir}/${file}`);
            let commandName = file.split('.')[0]
            console.log(`✅ [Менеджер команд] Команда ${commandName} завантаженна`)
            client.commands.set(commandName, command);
        }
    })

    const Commands = [];



client.login(process.env.TOKEN)