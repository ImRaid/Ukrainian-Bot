const Discord = require("discord.js");
const fetch = require("node-fetch");
const {ErrorBuilder} = require(`../../handlers/errorBuilder`)
module.exports = {
    desc:``,
    aliases:[`вікі`],
    run: async (client, message, args) => {
    if(!args[0]) return ErrorBuilder(message, "повідомлення",null,"Напиши помилку!")
    const body = await fetch(
      `https://uk.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        args.join(" ")
      )}`

    ).then(res => res.json().catch(() => {}));

    if (!body)

      return message.reply({embeds:[{

        

            color: 15548997,

          title: "Помилка",

          description: `Сторінка не знайдена`

        

      }]
    });

    if (body.title && body.title === "Not found.")

      return message.reply({embeds:[{

        
            color: 15548997,

            title: "Помилка",
  
            description: `Сторінка не знайдена`

      }]});

    const embed = new Discord.EmbedBuilder()

      .setTitle(`${body.title}`)
      .setURL(`${body.content_urls.desktop.page}`)

      .setDescription(`**${body.extract}**`)

      .setColor(`Random`)
			.setFooter({text:`Задав ${message.author.username}`, iconURL:message.author.displayAvatarURL({ format: 'png' })})

    if (body.thumbnail) embed.setThumbnail(body.thumbnail.source);

    message.reply({embeds:[embed]});

  }

};
