const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const { ErrorBuilder } = require("../../handlers/errorBuilder")
module.exports = {
	desc:'',
	run: async (client, message, args) => {
        if(args[0].includes("https://")) return ErrorBuilder(message,"відповідь",null,'Попередження, назва сабредіту має починатися з r/. Наприклад r/easyscript');
        if(args[0].includes("r/") == false) return ErrorBuilder(message,"відповідь",null,'Попередження, назва сабредіту має починатися з r/. Наприклад r/easyscript');
		const url = `https://api-1.raidandyukichhp.repl.co/subreddit?name=${args[0]}`;
		
        let data;
		
	
		try {
			data  = await axios.get(url);
			
            if(data.data.помилка){
             return ErrorBuilder(message,"відповідь",null,`${data.data.помилка}`);
            }
		} catch (e) {
			return ErrorBuilder(message,"відповідь",null,'Сталася помилка! Спробуй будь ласка, знову.');
		}

		const embed = new EmbedBuilder()
			.setTitle(`Сабредіт ${data.data.title}!`)
            .setThumbnail(data.data.icon)
            .setImage(data.data.banner)
            .addFields(
                {name:"Сабредіт:",value:`${data.data.subreddit}`,inline:true},
                {name:"Опис:",value:`${data.data.description}`,inline:false},
                {name:"Підписників:",value:`${data.data.subscribers}`,inline:true},
                )
			.setColor('Random')
      .setFooter({text:`Subreddit: ${data.data.subreddit}`,iconURL: `${data.data.icon}`})
      await message.reply({embeds:[embed]});
	},
};