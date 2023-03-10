const discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const fetch = require("node-fetch")

module.exports = {
    name: 'гітхаб',
    desc: "Інформація про вказаний вами Github аккаунт.",
    run: async(client, message, args) => {
        try {
            if(!args[0]) return message.channel.send(`Вкажи нік користувача!`)

            fetch(`https://api.github.com/users/${args.join('-')}`)
    .then(res => res.json()).then(body => {
      if(body.message) return message.channel.send(`Користувача не знайдено!`);
    let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio, email, company } = body;

            const embed = new EmbedBuilder()
            
 .setColor("Random")
 .setTitle('Інформація з Github')   
                .setThumbnail(`${avatar_url}`)
            .addFields({name:`Нік:`, value:`**${login}**`})
            .addFields({name:`Компанія:`, value:`${company || "**Нема**"}`})

                .setURL(html_url)
            
            
            .addFields({name:`Опис:`, value:`${bio || "**Не вказаний**"}`})
            .addFields({name:`Пошта:`, value:`${email || "**Не вказана**"}`})
            
            .addFields({name:`Слідкує за`, value:`${following} користувачами`})
            .addFields({name:`Слідкувачів:`, value:`${followers}`})
            .addFields({name:`Публічних репозиторіїв:`, value:`${public_repos}`})
            .setFooter({text:`Ukrainian Bot`, iconURL:client.user.displayAvatarURL()})

    message.channel.send({
        embeds:[embed]
    })

    })

        } catch (error) {
            console.log(error);
            return message.channel.send(`Щось пішло не так!`)
        }
    }
    }