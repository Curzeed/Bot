const {SlashCommandBuilder} = require('@discordjs/builders');
const mysql = require('mysql');
const { host, port, user, password, database} = require('../config.json');
const {rejects} = require("assert");

async function membersgdg(callback) {
    let bdd = mysql.createPool({
        host : host,
        user : user,
        password : password,
        port : port,
        database : database,
    })
    names = [];
    await bdd.query('SELECT * FROM Eclypsea', function (err, result) {
        // if any error while executing above query, throw error
        if (err) throw err;
        // if there is no error, you have the result
        // iterate for all the rows in result
        Object.keys(result).forEach(function(key) {
            var row = result[key];
            names.push(row.nom);
        });
    });
    await  bdd.query('SELECT * FROM Garuroku', function (err, result) {
        // if any error while executing above query, throw error
        if (err) throw err;
        // if there is no error, you have the result
        // iterate for all the rows in result
        Object.keys(result).forEach(function(key) {
            var row = result[key];
            names.push(row.nom);
        });
        callback(names);
    })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('score')
        .setDescription("Supprimer un membre de la liste ")
        .addStringOption(option => option.setName('membre').setDescription('Pseudo du membre').setRequired(true))
        .addStringOption(option => option.setName('guilde').setDescription('Guilde du membre').addChoices([['Eclypsea', "Eclypsea"], ["Garuroku", "Garuroku"]]).setRequired(true))
        .addNumberOption(option => option.setName('points').setDescription('Entrez les points à ajouter').setRequired(true)),
    async execute(interaction) {
        let resGuilde = interaction.options.getString('guilde');
        let resUser = interaction.options.getString('membre');
        let points = interaction.options.getNumber('points');

        await membersgdg(function(names){
            if(names.includes(resUser)){
                let bdd = mysql.createPool({
                    host : host,
                    user : user,
                    password : password,
                    port : port,
                    database : database,
                })
                let ptsUser;
                switch(resGuilde) {
                    case "Garuroku" :
                        try {
                            bdd.query('UPDATE Garuroku SET score = score + ? WHERE nom=?', [points, resUser]);
                            bdd.query('SELECT score FROM Garuroku WHERE nom=?;', [resUser], function (err, rows) {
                                if (rows === undefined) {
                                    throw (new Error("Error no row defined"))
                                } else {
                                    ptsUser = rows[0].score;
                                }
                            })
                            interaction.reply(`Tu as ajouté ${points} points à ${resUser} \n Il a désormais : ${ptsUser} points ! `)
                        } catch (error) {
                            console.log(error.stack)
                            interaction.reply("Erreur de suppression dans la base de donnée ! ")
                        }
                        break;
                    case "Eclypsea" :
                        try {
                            bdd.query('UPDATE Eclypsea SET score = score + ? WHERE nom=?', [points, resUser]);
                            bdd.query('SELECT score FROM Eclypsea WHERE nom=?;', [resUser], function (err, rows) {
                                if (rows === undefined) {
                                    throw (new Error("Error no row defined"))
                                } else {
                                     ptsUser = rows[0].score;
                                }
                            })
                            console.log(ptsUser)
                            interaction.reply(`Tu as ajouté ${points} points à ${resUser} \n Il a désormais : ${ptsUser} points ! `)
                        } catch (error) {
                            console.log(error.stack)
                            interaction.reply("Erreur de suppression dans la base de donnée ! ")
                        }
                        break;
                }
            }else{
                interaction.reply("Qui est donc ce bougre ?")
                return;
            }
        })
    }
}