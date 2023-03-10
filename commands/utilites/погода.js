const weather = require('weather-js');
const { ErrorBuilder } = require('../../handlers/errorBuilder');
const { EmbedBuilder } = require('discord.js');
const translate = require('@iamtraction/google-translate');
module.exports = {
    desc: ``,
    run: async (client, message, args) => {
     try {
            if (!args.length) return ErrorBuilder(message,"Відповідь",null,`Введи своє місто!`)
            await weather.find({ search: (await translate(`${args.join(` `)}`,{from:`uk`,to:`en`})).text, degreeType: 'C'}, async(err, result) => {
                if (err) return ErrorBuilder(message,"Відповідь",null,`Не знайдено результатів.`)
                if (!result || !result.length) return ErrorBuilder(message,"Відповідь",null,`Зв'язок не встановлено!`)
              
                

                let fields = [];
             
                for (let i = 0; i < result[0].forecast.length; i++) {
                if (result[0].forecast[i].skytextday === 'Sunny') {
              result[0].forecast[i].skytextday = 'Сонячно';
              }

              if (result[0].forecast[i].skytextday === 'Mostly Cloudy') {
              result[0].forecast[i].skytextday = 'Переважно хмарно';
              }

               if (result[0].forecast[i].skytextday === 'Cloudy') {
              result[0].forecast[i].skytextday = 'Хмарно';}

              if (result[0].forecast[i].skytextday === 'Partly Cloudy') {
              result[0].forecast[i].skytextday = 'Невелика хмарність';}

              if (result[0].forecast[i].skytextday === 'Partly Sunny') {
              result[0].forecast[i].skytextday = 'Місцями сонячно';}

              if (result[0].forecast[i].skytextday === 'Partly Sunny') {
              result[0].forecast[i].skytextday = 'Місцями сонячно';}

              if (result[0].forecast[i].skytextday === 'Rain') {
              result[0].forecast[i].skytextday = 'Дощ';}

              if (result[0].forecast[i].skytextday === 'Clear') {
                result[0].forecast[i].skytextday =  'Ясно';}
  if
(result[0].forecast[i].skytextday === 'Mostly Clear') {
                result[0].forecast[i].skytextday =  'Переважно Ясно';}                   

              if (result[0].forecast[i].skytextday === 'Light Rain') {
              result[0].forecast[i].skytextday = 'Невеликий дощ';}

               if (result[0].forecast[i].skytextday === 'Mostly Sunny') {
              result[0].forecast[i].skytextday = 'Переважно сонячно';}

              if (result[0].forecast[i].skytextday === 'Rain Showers') {
                result[0].forecast[i].skytextday = 'Злива';}
              if (result[0].forecast[i].skytextday === 'Snow Showers') {
                    result[0].forecast[i].skytextday = 'Снігопад';}
                    if (result[0].forecast[i].skytextday === 'Light Snow') {
                        result[0].forecast[i].skytextday = 'Легкий сніг';}
                  

              

              
             
                    fields.push({
                        name: result[0].forecast[i].date,
                        value: `**Стан:** ${result[0].forecast[i].skytextday}\n**Низький:** ${result[0].forecast[i].low} \u00B0${result[0].location.degreetype}\n**Високий:** ${result[0].forecast[i].high} \u00B0${result[0].location.degreetype}\n**Атмосферні опади:** ${result[0].forecast[i].precip}%`
                    });
                    
            }
           
            
                 
                await message.reply({
                    embeds: [{
                        timestamp: new Date(),
                        title: 'Прогноз погоди',
                        description: (await translate(`${result[0].location.name}`,{from: 'en',to:"uk"})).text,
                        color: 0x2ee50e,
                        fields: fields,      
                        footer: {
                          iconURL: client.user.displayAvatarURL(), //во
                            text: 'Для точного пошуку, вказуйте місто мовою оригіналу!'
                                                                 
                        }

                  
                }]
                
            })
           
            
     })
}catch (err) {
            return
}
          }
}
//ураааа