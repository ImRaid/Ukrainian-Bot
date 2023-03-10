const { EmbedBuilder, PermissionsBitField} = require('discord.js');
const {ErrorBuilder} = require("../../handlers/errorBuilder")
module.exports = {
	desc:"",
	run: async (client, message, args) => {
		if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return ErrorBuilder(message,"відповідь",null,`Ви не маєте дозволів для виконання цієї дії ${message.author.username}!`)
		if (!args[0]) return ErrorBuilder(message,"відповідь",null,"Будь ласка, введіть число від 1 до 100!")
		let deleteAmount = parseInt(args[0], 10);
		if (Number.isNaN(deleteAmount)) return ErrorBuilder(message,"відповідь",null,"Будь ласка, введіть число від 1 до 100!")
		if (deleteAmount > 100) {
			deleteAmount = 100;
		} else {
			deleteAmount = parseInt(args[0], 10);
		}

		await message.channel.bulkDelete(deleteAmount, true);

		const embed = new EmbedBuilder()
			.setTitle(`**Сповіщення**`)
			.setDescription(`**Успішно видалено ${deleteAmount} повідомленн(я/ь)!**`)
			.setFooter({text:message.author.username, iconURL:message.author.displayAvatarURL()})
			.setColor('Green')
		message.channel.send({embeds:[embed]});
	},
};