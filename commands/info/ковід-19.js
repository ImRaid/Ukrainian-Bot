const axios = require('axios')
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name:'ковід-19',
    desc:"Ковід-19 статистика в Україні.",
	run: async (client, message, args) => {
    const url = `https://disease.sh/v3/covid-19/countries/Ukraine?strict=true`
        const get = axios.get(url)
        console.log(get)
        const embed = new EmbedBuilder()
			.setTitle(`Ковід-19 в Україні`)
        .setDescription(`Всього випадків: ${get.cases}
Випадків за сьогодні: ${get.todayCases}
Всього смертей: ${get.deaths}
Смертей за сьогодні: ${get.todayDeaths}
Критичні випадки: ${get.critical}
Всього врятовано: ${get.recovered}
Врятовано за сьогодні: ${get.todayRecovered}`)
			.setColor('Random')
      .setFooter({text:`Ukrainian Bot`, icon:client.user.displayAvatarURL()})
      .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/1280px-Flag_of_Ukraine.svg.png');
		message.channel.send({embeds:[embed]});
	}
}