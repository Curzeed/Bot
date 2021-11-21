const {SlashCommandBuilder} = require('@discordjs/builders');
const mysql = require('mysql');
const { host, port, user, password, database} = require('../config.json');
const {rejects} = require("assert");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("reset")
    .setDescription("Permet de reset tous les scores des deux guildes (à faire en début de semaine)"),
    
    async execute(interaction){
        if(interaction.member.roles.cache.some(role => role.name === 'dev')){
            let bdd = mysql.createPool({
                host : host,
                user : user,
                password : password,
                port : port,
                database : database,
            })
            await bdd.query('UPDATE Eclypsea SET score = 0 WHERE 1 = 1');
            await bdd.query('UPDATE Eclypsea SET score = 0 WHERE 1 = 1');
            
            interaction.reply('');
        }else{
            const channel = interaction.channel
            const embed= new MessageEmbed()
                .setColor("#800303")
                .setTitle("C'est non !")
                .setImage("https://img.passeportsante.net/1000x526/2020-01-29/i93384-.jpeg")
                .setDescription("Tu n'es pas autorisé à utiliser ça")
                .setTimestamp()
            channel.send({embeds : [embed]});
            return;
        }
        
    }
}