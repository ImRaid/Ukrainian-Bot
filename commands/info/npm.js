const fetch = require("node-fetch");
const {ErrorBuilder} = require("../../handlers/errorBuilder")
const {  EmbedBuilder } = require(`discord.js`);
module.exports = {
    desc:``,
  	run: async (client, message, args, user, text, prefix) => {
		
		try {
			const pkg = args[0];
			if (!pkg) return ErrorBuilder(message,"Відповідь",null,`Вкажи npm бібліотеку яку хочеш знайти.`)
			const body = await fetch(`https://registry.npmjs.com/${pkg}`)
				.then((res) => {
				if(res.status === 404) throw "Нічого не знайдено";
				return res.json();
				});
		
			const version = body.versions[body["dist-tags"].latest];
		
			let deps = version.dependencies ? Object.keys(version.dependencies) : null;
			let maintainers = body.maintainers.map((user) => user.name);
		
			if(maintainers.length > 10) {
				const len = maintainers.length - 10;
				maintainers = maintainers.slice(0, 10);
				maintainers.push(`...${len} more.`);
			}
		
			if(deps && deps.length > 10) {
				const len = deps.length - 10;
				deps = deps.slice(0, 10);
				deps.push(`...${len} more.`);
			}
		 if (body.description === undefined) body.description = 'Опису не вказано';
			return await message.reply({ embeds:[ new EmbedBuilder()
                .setThumbnail('https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png')
				.setTitle(`Інформація про бібліотеку ${pkg}`)
				.setColor("Random")
				.setFooter({text:'Ukrainian Bot', iconURL:client.user.displayAvatarURL()})
									.setDescription([
'Опис:',                                  
				`**${body.description}**` || "Опису не вказано",
                `Автор: ${body.author ? body.author.name : "Не відомий"}`,
				`Версія: ${body["dist-tags"].latest}`,
                `Посилання: https://npmjs.com/package/${pkg}`                               
             	
				].join("\n")) ]});
		} catch (e) {
			console.log(String(e.stack).bgRed)
			return ErrorBuilder(message,"Відповідь",null,`Сталася помилка, спробуй будь ласка пізніше.`)
			  
		  }
	
	}
}