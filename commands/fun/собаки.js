const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const { ErrorBuilder } = require("../../handlers/errorBuilder")
module.exports = {
	desc:'',
	run: async (client, message, args) => {
		const url = 'https://dog.ceo/api/breeds/image/random';

		let image;
		try {
			const { data } = await axios.get(url);
			image = data.message;
		} catch (e) {
			return ErrorBuilder(message,"відповідь",null,'Сталася помилка! Спробуй будь ласка, знову.');
		}

		const embed = new EmbedBuilder()
			.setTitle('Собачки :dog: ')
			.setColor('Random')
      .setFooter({text:`Переглядав ${message.author.username}`,iconURL:message.author.avatarURL()})
      .setImage(image);
      await message.reply({embeds:[embed]});
	},
};