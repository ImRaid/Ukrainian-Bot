const db = require("quick.db")

module.exports = async(client, member) => {
    let cmdx = db.fetch(`roless_${member.guild.id}`)
       let q = db.fetch(`roless_${member.guild.id}_count`)
      
        console.log(q)
     if(db.get(`auto_${member.guild.id}`) === 'ввімк'){
    for(let i = 0; i < q+1 ;i++){
       if(cmdx) {
        let cmdy = cmdx.find(x => x.number === i)
        if(cmdy) {
            let role = member.guild.roles.cache.find(r => r.id === cmdy.give)
      
         await member.roles.add(role)
    

     } }}
 }
 
}