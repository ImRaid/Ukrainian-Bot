const Discord = require('discord.js')
const translate = require('@iamtraction/google-translate');
const {ErrorBuilder} = require(`../../handlers/errorBuilder`)
let languages = [
    "af",
    "sq",
    "am",
    "ar",
    "hy",
    "az",
    "eu",
    "be",
    "bn",
    "bs",
    "bg",
    "ca",
    "ceb",
    "ny",
    "zh-cn",
    "zh-tw",
    "co",
    "hr",
    "cs",
    "da",
    "nl",
    "en",
    "eo",
    "et",
    "tl",
    "fi",
    "fr",
    "fy",
    "gl",
    "ka",
    "de",
    "el",
    "gu",
    "ht",
    "ha",
    "haw",
    "iw",
    "hi",
    "hmn",
    "hu",
    "is",
    "ig",
    "id",
    "ga",
    "it",
    "ja",
    "jw",
    "kn",
    "kk",
    "km",
    "ko",
    "ku",
    "ky",
    "lo",
    "la",
    "lv",
    "lt",
    "lb",
    "mk",
    "mg",
    "ms",
    "ml",
    "mt",
    "mi",
    "mr",
    "mn",
    "my",
    "ne",
    "no",
    "ps",
    "fa",
    "pl",
    "pt",
    "pa",
    "ro",
    "ru",
    "sm",
    "gd",
    "sr",
    "st",
    "sn",
    "sd",
    "si",
    "sk",
    "sl",
    "so",
    "es",
    "su",
    "sw",
    "sv",
    "tg",
    "ta",
    "te",
    "th",
    "tr",
    "uk",
    "ur",
    "uz",
    "vi",
    "cy",
    "xh",
    "yi",
    "yo",
    "zu",
    "."

]
module.exports = {
    dec:``,
    run: async (client, message, args) => {
        const text1 = args.join(" ").split("|")[0]
const text2 = args.join("").split("|")[1]
        if(!text1 || !text2) return ErrorBuilder(message,"відповідь",null,'Вкажи текст для перекладу і мову на яку перекласти за прикладом: **ua! перекласти Hello | uk**')
        for (let i = 0; i < languages.length+1;i++) {
         
            if(languages[i] === text2){
        translate(text1, {to:text2}).then((res) =>{ 
            console.log(res)
      
       let embed = new Discord.EmbedBuilder()
       .setTitle(`Успіхи`)
       .setDescription('**Перекладено ваш текст**')
       .setColor(`Green`)
       .addFields(
        {name:`Текст раніше:`, value:`**${text1}**`, inline:true},
        {name:`Перекладений текст:`, value:`**${res.text}**`},
        {name:`Мова з якої було перекладено:`, value:`**${res.from.language.iso}**`,inline:false})
       .setFooter({text:`Задав ${message.author.username}`,iconURL:message.author.displayAvatarURL({dynamic:true})})
       message.reply({embeds:[embed]})
        
           
            //треба буде зробити їх список, зробимо потім на сайті або в команді
       })
      return
            }
            
            if( text2.length > 5 || i == 105) return ErrorBuilder(message,"відповідь",null,`Такої мови немає в нашій базі. Спробуйте ввести іншу iso мови.`)
            
 }
    }

}
