const {EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch')
const {ErrorBuilder} = require("../../handlers/errorBuilder")

module.exports = {
    desc:``,
    run: async (client, message, args) => {
const pkg = args[0];
if (!pkg) return ErrorBuilder(message,"Відповідь",null,`Вкажи npm бібліотеку яку хочеш знайти.`)
        try{
       const url = `https://pypi.org/pypi/${pkg}/json`;
       fetch(url).then(async(res) => {
        
				if(res.status === 404) throw "Нічого не знайдено";
				return res.json();
				}).then(async(body) =>{
    	
   

        let email;
        if(!body.info.author_email || body.info.author_email === 'None') { email = 'Не вказана' } else {
            email = `${body.info.author_email}`
        }
    
      let embed = new EmbedBuilder()
        .setTitle(`Інформація про бібліотеку ${body.info.name}`)
        .setThumbnail(`https://raw.githubusercontent.com/github/explore/666de02829613e0244e9441b114edb85781e972c/topics/pip/pip.png`)
        .setDescription(`[Натисни сюди щоб перейти в бібліотеку](${body.info.package_url})`)
        .addFields({name:'Опис:', value:`**${body.info.summary}**`})
        .addFields({name:'Автор: ', value:`**${body.info.author}**`})
        .addFields({name:'Пошта автора: ', value:`**${email}**`})
        .addFields({name:'Версія: ', value:`**${body.info.version}**`})
        .addFields({name:'Репозиторій: ', value:`${body.info.project_urls.Homepage}`})
      await message.reply({embeds:[embed]}) 
       })
  }catch (e) {
			console.log(String(e.stack).bgRed)
			return ErrorBuilder(message,"Відповідь",null,`Сталася помилка, спробуй будь ласка пізніше.`)
}
            }
}