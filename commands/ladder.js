const {SlashCommandBuilder} = require('@discordjs/builders');
const db = require('../getConnection');
const pool = db.getPool();
const {MessageEmbed} = require("discord.js");
var embedMes = new MessageEmbed();
const firstPlace ="🥇 ";
const secondPlace = "🥈 ";
const thirdPlace = "🥉 ";
function strUcFirst(a){return (a+'').charAt(0).toUpperCase()+a.substr(1);}

module.exports ={
    data: new SlashCommandBuilder()
        .setName('ladder')
        .setDescription("Afficher le classement de la guilde")
        .addStringOption(option => option.setName('guilde').setDescription('Guilde du membre').addChoices([['Eclypsea', "Eclypsea"], ["Garuroku", "Garuroku"]]).setRequired(true)),
        async execute(interaction){
            await interaction.deferReply();
            let resGuilde = interaction.options.getString('guilde');
            if(resGuilde){
                switch(resGuilde){
                    case "Garuroku" : 
                        embedMes
                        .setImage("https://wesportfr.com/wp-content/uploads/2021/03/HoF2021.jpg")
                        .setTitle('Classement de Garuroku');
                        try{
                            pool.query('SELECT * FROM Garuroku ORDER BY score DESC', async function(err,rows){
                                if(err) throw err;
                                rows.sort(function(a,b){
                                    return b.score-a.score;
                                })
                                console.log(rows)
                                for(let i=0; i<rows.length; i++){
                                    if(rows[i].id === rows[0].id){
                                        embedMes.addField(firstPlace+strUcFirst(rows[i].nom), rows[i].score.toString())
                                    }else if(rows[i].id === rows[1].id){
                                        embedMes.addField(secondPlace+strUcFirst(rows[i].nom), rows[i].score.toString())
                                    }else if(rows[i].id === rows[2].id){
                                        embedMes.addField(thirdPlace+strUcFirst(rows[i].nom), rows[i].score.toString())
                                    }
                                    else{
                                        embedMes.addField([i+1]+". "+strUcFirst(rows[i].nom), rows[i].score.toString())
                                    }
                                    
                                }
                                interaction.editReply({embeds: [embedMes]});
                                embedMes = new MessageEmbed();
                            })
                        }catch(error){
                            console.log(error.stack);
                        }
                    break;

                    case "Eclypsea" : 
                    embedMes
                    .setImage("https://wesportfr.com/wp-content/uploads/2021/03/HoF2021.jpg")
                    .setTitle("Classement d'Eclypsea");
                    try{
                        pool.query('SELECT * FROM Eclypsea ORDER BY score DESC', async function(err,rows){
                            if(err) throw err;
                            rows.sort(function(a,b){
                                return b.score-a.score;
                            })
                            console.log(rows)
                            
                            for(let i=0; i<rows.length; i++){
                                strUcFirst(rows[i].nom);
                                if(rows[i].id === rows[0].id){
                                    embedMes.addField(firstPlace+strUcFirst(rows[i].nom), rows[i].score.toString())
                                }else if(rows[i].id === rows[1].id){
                                    embedMes.addField(secondPlace+strUcFirst(rows[i].nom), rows[i].score.toString())
                                }else if(rows[i].id === rows[2].id){
                                    embedMes.addField(thirdPlace+strUcFirst(rows[i].nom), rows[i].score.toString())
                                }
                                else{
                                    embedMes.addField([i+1]+". "+strUcFirst(rows[i].nom), rows[i].score.toString())
                                }
                                
                            }
                            interaction.editReply({embeds: [embedMes]});
                            embedMes = new MessageEmbed();
                        })
                    }catch(error){
                        console.log(error.stack);
                    }
                    break;
                } // fin switch
            } // premier if
        }// fin fonction
    }// fin module