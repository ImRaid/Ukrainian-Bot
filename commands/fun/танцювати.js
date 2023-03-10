const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');
const { ErrorBuilder } = require("../../handlers/errorBuilder")
module.exports = {
	desc:'',
	run: async (client, message, args) => {
		let url = `https://g.tenor.com/v1/search?q=Dance&key=${process.env.tenor}&limit=1000`;
        let response = await fetch(url);
        let json = await response.json();
        const index = Math.floor(Math.random() * json.results.length);

		const embed = new EmbedBuilder()
			.setTitle(`**${message.author.username}** почав танцювати`)
			.setColor('Random')
			.setFooter({text:`Ukrainian Bot`,iconURL:client.user.displayAvatarURL()})
      .setImage(json.results[index].media[0].gif.url);
      await message.reply({embeds:[embed]});
	},
};