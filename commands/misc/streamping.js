const {SlashCommandBuilder} = require('@discordjs/builders');
const db = require('../../functions/database')
const func = require('../../functions/functions')
module.exports = {
 
    data : new SlashCommandBuilder()
    .setName('streamping')
    .setDescription('Ajoute un streamer à suivre dans la liste')
    .addStringOption(opt=> opt.setName('name').setDescription('streamer').setRequired(true)),
 
    async execute (interaction) {
        const streamer = interaction.options.getString("name");
        if(!func.isMod(interaction)){
            return await interaction.reply({embeds : [func.notMod(interaction)]})  
        }
        try{
            db.addStreamTracked(streamer);
        }catch(err){
            console.error("Error during streamPing : " + err)
            return interaction.reply("Un problème a été détecté durant l'insertion")
        }
        return interaction.reply(`Le streamer : ${streamer} a bien été ajouté !`)  
    }
}