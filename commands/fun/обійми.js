const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const { ErrorBuilder } = require("../../handlers/errorBuilder")
module.exports = {
	desc:'',
	run: async (client, message, args) => {
		const url = 'https://api-1.raidandyukichhp.repl.co/hug';
		const user = message.mentions.members.first()
		if (!user) {
			return ErrorBuilder(message,"відповідь",null,'Вкажи користувача якого хочеш обійняти.');
		}
		let image;
		try {
			const { data } = await axios.get(url);
			image = data.ukraine;
		} catch (e) {
			return ErrorBuilder(message,"відповідь",null,'Сталася помилка! Спробуй будь ласка, знову.');
		}

		const embed = new EmbedBuilder()
			.setTitle(`Обіймашки! ${message.author.username} обійняв ${user.user.username}! :hugging: `)
			.setColor('Random')
      .setFooter({text:`Ukrainian Bot`,iconURL:client.user.displayAvatarURL()})
      .setImage(image);
      await message.reply({embeds:[embed]});
	},
};