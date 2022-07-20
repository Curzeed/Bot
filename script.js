const sqlite = require('sqlite3')
const db = new sqlite.Database('levels.db', err => {
  if (err)  throw err      
})
db.run(
  "CREATE TABLE users(id, ammountXp, level)"
, (err) => {throw err})