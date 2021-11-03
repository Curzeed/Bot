const {SlashCommandBuilder} = require('@discordjs/builders');
const mysql = require('mysql');
const { host, port, user, password, database} = require('../config.json');


async function membersgdg(bddClient, callback) {
     let bdd = mysql.createPool({
        host : host,
        user : user,
        password : password,
        port : port,
        database : database,                
    })
	 names = [];
	    bdd.query('SELECT nom FROM Eclypsea', (err, res) => {
		if (err) {
			console.log(err.stack);
		} else {
			result = res.rows;
			console.log(result);
		}
	})
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription("Ajout d'un membre dans la liste des gdg")
        .addStringOption(option => option.setName('membre').setDescription('Ajouter un membre').setRequired(true))
        .addStringOption(option=> option.setName('guilde').setDescription('Guilde du membre').addChoices([['Eclypsea',"Eclypsea"],["Garuroku","Garuroku"]]).setRequired(true)),
    async execute(interaction) {
        // TO DO : Faire une vérification de rôles + ajout de gestion d'erreurs
        
        let resGuilde = interaction.options.getString('guilde');
        let resUser = interaction.options.getString('membre');
        membersgdg( async function(names){
        if(!names.includes(resUser)){
            switch(resGuilde){
                case "Garuroku" : try{
                    bdd.query('INSERT INTO Garuroku SET nom = ?',[resUser]);
                    await interaction.reply(`Ajout du membre ${resUser} avec succès ! `)
                }catch(error){
                    console.log(err.stack)
                    await interaction.reply("Erreur d'insertion dans la base de donnée ! ")
                }
                    break;
                case "Eclypsea" : try{
                    bdd.query('INSERT INTO Eclypsea SET nom = ?',[resUser]);
                    await interaction.reply(`Ajout du membre ${resUser} avec succès ! `)
                }catch(error){
                    console.log(err.stack)
                    await interaction.reply("Erreur d'insertion dans la base de donnée ! ")
                }
                    break;
            }
        }else{
            console.log("User already exist")
            await interaction.reply("Le membre est déjà dans la liste des membres ! ")
            return;
        }
    })
}
};

