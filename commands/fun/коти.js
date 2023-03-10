const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const { ErrorBuilder } = require("../../handlers/errorBuilder")
module.exports = {
	desc:'',
	run: async (client, message, args) => {
		const url = 'https://api-1.raidandyukichhp.repl.co/cats';

		let image;
		try {
			const { data } = await axios.get(url);
			image = data.ukraine;
		} catch (e) {
			return ErrorBuilder(message,"відповідь",null,'Сталася помилка! Спробуй будь ласка, знову.');
		}

		const embed = new EmbedBuilder()
			.setTitle('Оуу, як мило! :heart_eyes_cat:')
			.setColor('Random')
      .setFooter({text:`Переглядав ${message.author.username}`,iconURL:message.author.avatarURL()})
      .setImage(image);
      await message.reply({embeds:[embed]});
	},
};