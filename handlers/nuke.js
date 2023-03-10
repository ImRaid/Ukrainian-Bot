async function nuke(msgormessage, sendAfterNuked){
try{
    if(!msgormessage) throw new TypeError("You must specify that you are using message or msg")
  
    if(!sendAfterNuked) throw new TypeError("The message to be sent after nuking should appear")
    let pos =  await msgormessage.channel.rawPosition
  
    msgormessage.channel.clone().then(channel => {
      channel.send({embeds:[sendAfterNuked]});
      channel.setPosition(pos);
    })
    msgormessage.channel.delete();
  }
catch(e){
    console.log(e)
}
}
  module.exports = {nuke};