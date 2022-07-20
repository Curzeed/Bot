const db = require('../functions/database')

module.exports = async function (client) {
    client.on('messageCreate', async (message) => {
        var userDb
        if(message.author.bot) return;
        await db.getUserDb(message.author.id,message.createdTimestamp,message.author.username, function (value) {
            userDb = value[0]
            const userLastMessage = userDb.lastMessage
            const userLevel = userDb.level
            if((message.createdTimestamp - userLastMessage) < 6000){
                console.log("gagnepa")
                return
            } 
            const xpNeeded =  Math.floor(+100 * userLevel / 0.75 * 0.75) 
            const xpGiven = Math.round(Math.random()*11)
            db.giveXp(userDb.id,xpGiven,message.createdTimestamp,xpNeeded, function (value) {
                let finalUser = value[0]
                if(finalUser.currentXp >= xpNeeded){
                    db.levelUp(finalUser.id,finalUser.level)
                    message.channel.send("Bravo tu es passé au niveau " + (+finalUser.level + 1) + " !")
                }
            })
        })
        
    })
}