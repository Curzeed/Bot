const sqlite = require('sqlite3')
const db = new sqlite.Database('levels.db', err => {
  if (err)  throw err      
  console.log("Database connected.")
})

module.exports = {
  /**
   * close connection of the db
   */
    closeConnection : function (){
      db.close(err => {
        if(err) throw err
      })
    },
    /**
     * To insert or retrieve the user who wrote a message
     * @param {*} userId (interaction user id)
     * @param {*} messageDate (interaction timestamp message)
     * @param {*} username (Interaction username)
     * @param {*} callback (user => user.id...)
     */
    getUserDb : async function (userId,messageDate,username, callback){
      // TO DO : Requete a chaque message a regler
        db.run(
          `INSERT INTO users (id,lastMessage, username, level, currentXp) VALUES (?,?,?,1,0);`,[userId,messageDate,username]
        ,(err)=>{
          // SQL CONSTRAINT UNIQUE
          if(err){}
        })
        db.all(
        `SELECT * FROM users WHERE id = ${userId}`
        ,(err,row)=>{
          if(err){
            console.error("Error on select during GetUserDb : \n" + err)
          }
          callback(row)
        })  
    },
    /**
     * Permit to give xp and update the result in db
     * @param {*} userId (interaction user id)
     * @param {*} xpGiven (random number generated)
     * @param {*} messageDate (interaction timestamp message)
     * @param {*} xpNeeded (xp for lvl up)
     * @param {callback} callback ( user => user.id... After the update )
     */
    giveXp : async function (userId,xpGiven,messageDate,xpNeeded, callback){
      db.run(
        `UPDATE users SET currentXp = ? + currentXp, lastMessage = ? ,xpNeeded = ? WHERE id = ? RETURNING *`
        ,[xpGiven,messageDate,xpNeeded,userId],(err) => {
          if (err){
            console.log("Error on Update during GiveXp : \n" + err)
          }
          db.all(
            `SELECT * FROM users WHERE id = ?`,[userId],(err,row)=>{
              if(err) throw err;
              callback(row)
            }
          )
        }
      )
      
    },
    /**
     * just an update for the user to level up
     * @param {*} userId 
     * @param {*} userLevel 
     */
    levelUp : async function (userId,userLevel){
      db.run(
        `UPDATE users SET level = ${userLevel} + 1, currentXp = 0 WHERE id = ${userId}`,(err) => {
          if (err){
            console.log("Error on Update during GiveXp : \n" + err)
          }
        }
      )
    },
    singleRank : async function (userId, callback){
      db.all(
        `SELECT * FROM users WHERE id = ${userId}`,(err,row)=>{
          if (err){
            console.log("Error on Select during rank : \n" + err)
          }
          callback(row[0])
        }
      )
    },
    /**
     * Return all the users from the db and sort them 
     * @param {callback}
     */
    getRank : async function (callback){
      db.all(
        `SELECT * FROM Users ORDER BY level DESC,currentXp DESC`
      ,(err,rows) => {
        if (err){
          console.log("Error on Select during rank : \n" + err)
        }
        callback(rows)
      })
    },
    /**
     * 
     */
    getStreamsTracked : function (){
      db.all(
        `SELECT * FROM streamsTracked `,
        (err,rows) => {
          if(err) throw err;
          return rows;
        }
      )
    },
    /**
     * Add user to track their stream
     * @param {*} streamer channel_streamer
     */
    addStreamTracked : function (streamer){
      db.run(
        `INSERT INTO streamsTracked (channel_name) VALUES (?)`,[streamer],(err)=>{
          if (err) throw err;
        }
      )
    }
  }