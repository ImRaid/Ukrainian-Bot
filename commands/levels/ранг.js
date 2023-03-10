const { EmbedBuilder, AttachmentBuilder, ApplicationCommandNumericOptionMinMaxValueMixin } = require('discord.js')
const db = require('quick.db')
const Canvas = require('canvas')
const { createCanvas, loadImage, registerFont } = require('canvas');
const { resolve } = require("path");
registerFont('./assets/oswald.ttf', { family: 'Oswald' })

module.exports.run = async(client, message, args) => {
  function formatNumber(num) {
    if (num >= 1000) {
      const units = ["K", "M", "B", "T"];
      const decimalPlaces = 1;
      const unitIndex = Math.floor(Math.log10(num) / 3);
      const unit = units[unitIndex - 1];
      const formattedNum = (num / 1000 ** unitIndex).toFixed(decimalPlaces);
      return `${formattedNum}${unit}`;
    }
    return num.toString();
  }
    const user = message.mentions.users.first() || message.author
    const canvas = Canvas.createCanvas(1200, 400)
    const level = db.get(`guild_${message.guild.id}_level_${user.id}`) || 1;
    const xp = db.get(`guild_${message.guild.id}_xp_${user.id}`) || 0;
    const needxp = level * 500;
    
    const circle = {
        x: 210,
        y: 200,
        radius: 150
    }
    const ctx = canvas.getContext('2d')
    let bg = "";
    if(db.get(`levelbg_${message.guild.id}`)) {
        bg = await Canvas.loadImage(db.get(`levelbg_${message.guild.id}`))
    } else {
        bg = await Canvas.loadImage('assets/spacebg.png')
    }
    let txt =`РІВЕНЬ`
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
    ctx.globalCompositeOperation = 'overlay'
    ctx.drawImage(await Canvas.loadImage('assets/pon.png'), 0, 0, canvas.width, canvas.height)
    ctx.globalCompositeOperation = "source-over";
    ctx.font = '40px Oswald';
    ctx.fillStyle = '#fff'
    ctx.fillText(txt, 890, 95) //з більшої краще буде
    ctx.font = '45px Oswald';
    ctx.fillStyle = '#fff';
    ctx.fillText(`${level}`, 1020, 95)
    ctx.font = '30px Oswald';
    ctx.fillStyle = '#fff';
    ctx.fillText(`${formatNumber(xp)}/${formatNumber(needxp)}`, 890, 295)
    let usernameFontSize = '50px';
if (user.username.length > 10) {
  usernameFontSize = '40px';
}
if(user.username.length > 20) {
    usernameFontSize = '30px'
}

ctx.font = usernameFontSize + ' Oswald';
ctx.fillStyle = '#fff';
const usernameText = ctx.measureText(user.username);
const usernameX = 370;
const usernameY = 290;
ctx.fillText(user.username, usernameX, usernameY);

ctx.font = '30px Oswald';
ctx.fillStyle = '#686868';
const tagText = `#${user.tag.split('#')[1]}`;
const tagX = usernameX + usernameText.width + 10; // add 10px spacing
const tagY = 290; // adjust y position to center tag
ctx.fillText(tagText, tagX, tagY);

    
    const barX = 350;
    const barY = 300;
    const barWidth = 680;
    const barHeight = 37.5;
    borderRadius = Math.min(barWidth, barHeight) / 2;
    const progress = xp / needxp;


ctx.beginPath();
ctx.moveTo(barX + borderRadius, barY);
ctx.lineTo(barX + barWidth - borderRadius, barY);
ctx.arcTo(barX + barWidth, barY, barX + barWidth, barY + borderRadius, borderRadius);
ctx.lineTo(barX + barWidth, barY + barHeight - borderRadius);
ctx.arcTo(barX + barWidth, barY + barHeight, barX + barWidth - borderRadius, barY + barHeight, borderRadius);
ctx.lineTo(barX + borderRadius, barY + barHeight);
ctx.arcTo(barX, barY + barHeight, barX, barY + barHeight - borderRadius, borderRadius);
ctx.lineTo(barX, barY + borderRadius);
ctx.arcTo(barX, barY, barX + borderRadius, barY, borderRadius);
ctx.closePath();


const gradient = ctx.createLinearGradient(barX, barY, barX + barWidth, barY);
gradient.addColorStop(0, "#c3e2ff");
gradient.addColorStop(1, "#ffffff");
ctx.fillStyle = gradient;
ctx.fill();


if (progress > 0) {
  ctx.beginPath();
  ctx.moveTo(barX + borderRadius, barY);
  ctx.lineTo(barX + barWidth * progress - borderRadius, barY);
  ctx.arcTo(barX + barWidth * progress, barY, barX + barWidth * progress, barY + borderRadius, borderRadius);
  ctx.lineTo(barX + barWidth * progress, barY + barHeight - borderRadius);
  ctx.arcTo(barX + barWidth * progress, barY + barHeight, barX + barWidth * progress - borderRadius, barY + barHeight, borderRadius);
  ctx.lineTo(barX + borderRadius, barY + barHeight);
  ctx.arcTo(barX, barY + barHeight, barX, barY + barHeight - borderRadius, borderRadius);
  ctx.lineTo(barX, barY + borderRadius);
  ctx.arcTo(barX, barY, barX + borderRadius, barY, borderRadius);
  ctx.closePath();

  const progressGradient = ctx.createLinearGradient(barX, barY, barX + barWidth, barY);
  progressGradient.addColorStop(0, "#17c8ff");
  progressGradient.addColorStop(1, "#3293ff");
  ctx.fillStyle = progressGradient;
  ctx.fill();
}
let status = '' 
await message.guild.members.fetch(user.id).then(({presence}) => {
    if(presence.status === 'dnd') {
        status = '#ec0000'
    } else if(presence.status === 'online') {
        status = '#9ACD32'
    } else if(presence.status === 'idle') {
        status = '#FFFF00'
    } else if(presence.status === 'offline') {
        status = '#FFFFFF'
    }
  })
ctx.beginPath();
ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
ctx.closePath();
ctx.clip();
const ava = user.displayAvatarURL({ format: 'png', size: 2048 }).replace('webp', 'png')
const avatar = await Canvas.loadImage(ava);
var imageData = ctx.getImageData(0, 0, avatar.width, avatar.height);
function getAverageRGB(imageData) {
    var red = 0; green = 0; blue = 0;

    for(var i = 0; i < imageData.data.length; i += 4) {
        red += imageData.data[i];
        green += imageData.data[i + 1];
        blue += imageData.data[i + 2];
    }

    var total = imageData.data.length / 4;
    return {
        r: Math.round(red / total),
        g: Math.round(green / total),
        b: Math.round(blue / total)
      };
}
avgRGB = getAverageRGB(imageData);

var shadowColors = [
  { r: avgRGB.r + 30, g: avgRGB.g + 30, b: avgRGB.b + 30 },
  { r: avgRGB.r - 30, g: avgRGB.g - 30, b: avgRGB.b - 30 }
]
var background = { r: 255, g: 255, b: 255 };
function getClosestColor(colors, target) {
    var closestColor = colors[0];
    var minDistance = distance(colors[0], target);
  
    for (var i = 1; i < colors.length; i++) {
      var currentDistance = distance(colors[i], target);
      if (currentDistance < minDistance) {
        closestColor = colors[i];
        minDistance = currentDistance;
      }
    }
  
    return closestColor;
  }
  
  function distance(color1, color2) {
    var rDiff = color1.r - color2.r;
    var gDiff = color1.g - color2.g;
    var bDiff = color1.b - color2.b;
  
    return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
  }
  
const aspect = avatar.height / avatar.width;
    
const hsx = circle.radius * Math.max(1.0 / aspect, 1.0);
const hsy = circle.radius * Math.max(aspect, 1.0);
ctx.drawImage(avatar,circle.x - hsx,circle.y - hsy,hsx * 2,hsy * 2);
ctx.shadowBlur = 15;
ctx.shadowColor = `${status}`;
    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name:'rankcard-uabot.png' })
    const embed = new EmbedBuilder()
        .setTitle(`Ранг користувача ${user.username}`)
        .setImage(`attachment://${attachment.name}`)
        .setFooter({text: `Задав ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
    await message.reply({
        embeds: [embed],
        files: [attachment]
    })
}