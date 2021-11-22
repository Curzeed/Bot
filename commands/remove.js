const {SlashCommandBuilder} = require('@discordjs/builders');
const db = require('../getConnection');
const pool = db.getPool();
const {MessageEmbed} = require("discord.js");


async function membersgdg(callback) {
    names = [];
    await pool.query('SELECT * FROM Eclypsea', function (err, result) {
        // if any error while executing above query, throw error
        if (err) throw err;
        // if there is no error, you have the result
        // iterate for all the rows in result
        Object.keys(result).forEach(function(key) {
            var row = result[key];
            names.push(row.nom);
        });
    });
    await  pool.query('SELECT * FROM Garuroku', function (err, result) {
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
        .setName('remove')
        .setDescription("Supprimer un membre de la liste ")
        .addStringOption(option => option.setName('membre').setDescription('Pseudo du membre').setRequired(true))
        .addStringOption(option=> option.setName('guilde').setDescription('Guilde du membre').addChoices([['Eclypsea',"Eclypsea"],["Garuroku","Garuroku"]]).setRequired(true)),
    async execute(interaction) {
        // TO DO : Faire une vérification de rôles + ajout de gestion d'erreurs

        let resGuilde = interaction.options.getString('guilde');
        let resUser = interaction.options.getString('membre').toLowerCase();
        await membersgdg (function(names){

            if (interaction.member.roles.cache.some(role => role.name === 'dev')) {
                if(names.includes(resUser)){
                    switch(resGuilde){
                        case "Garuroku" : try{
                            pool.query('DELETE FROM Garuroku WHERE nom = ?',[resUser]);
                            interaction.reply(`Suppression du membre ${resUser} avec succès ! `)
                        }catch(error){
                            console.log(error.stack)
                            interaction.reply("Erreur de suppression dans la base de donnée ! ")
                        }
                            break;
                        case "Eclypsea" : try{
                            pool.query('DELETE FROM Eclypsea WHERE nom = ?',[resUser]);
                            interaction.reply(`Suppression du membre ${resUser} avec succès ! `)
                        }catch(error){
                            console.log(error.stack)
                            interaction.reply("Erreur de suppression dans la base de donnée ! ")
                        }
                            break;
                    }
                }else{
                    console.log("Who is this guy ?")
                    interaction.reply("Qui est donc ce bougre ?")
                }
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
        })
    }
};