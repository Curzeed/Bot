const { host, port, user, password, database} = require('../config.json');
const mysql = require('mysql');
class PrivateSingleton{
    constructor() {
        mysql.createPool({
            host : host,
            user : user,
            password : password,
            port : port,
            database : database,
        })
    }
}


class Singleton {
    constructor() {
        throw new Error('Use Singleton.getConnection()');
    }

    static getConnection(){
        if (!Singleton.instance){
            Singleton.instance  = new PrivateSingleton();
        }
        return Singleton.instance;
    }
}

module.exports = Singleton;