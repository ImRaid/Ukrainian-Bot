const { EmbedBuilder } = require('discord.js')
const { ErrorBuilder } = require('../../handlers/errorBuilder')
const sizeOf = require('image-size')
const request = require("request")
const db = require('quick.db')

module.exports.run = async(client, message, args) => {
    let image = message.attachments.first()
    if(!image) { return ErrorBuilder(message, 'відповідь', null, 'Вкажи фото у розмірі 1200x400!') }
    try {
        console.log(image.url)
        request({url: image.url, method:'HEAD'}, (err, res, body) => {
            if(!err) {
                console.log('бл')
                let imageData = Buffer.from('')
                request(image.url)
                .on('data', chunk => {
                    console.log('бл')
                    imageData = Buffer.concat([imageData, chunk])
                })
                .on('end', () => {
                    sizeOf(imageData, (err, dimensions) => {
                        console.log('бл')
                        if(!err && dimensions.width === 1200 && dimensions.height === 400) {
                            db.set(`levelbg_${message.guild.id}`, image.url)
                            message.reply({
                                embeds:[
                                    new EmbedBuilder()
                                        .setTitle('Успіхи')
                                        .setDescription('Я успішно поставив твій фон на ранг картку')
                                        .setColor("Random")
                                ]
                            })
                        } else {
                            return ErrorBuilder(message, 'відповідь', null, 'Твоє фото не у розмірі 1200x400!')
                        }
                    })
                })
            }
        })
    } catch(e) {
        console.log(e)
        return ErrorBuilder(message, 'відповідь', null, 'Можливо, ти вказав неіснуюче фото')
    }
}