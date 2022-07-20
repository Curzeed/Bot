const {SlashCommandBuilder} = require('@discordjs/builders');
const func = require('../../functions/functions')
const { Permissions } = require('discord.js');
module.exports = {
    data : new SlashCommandBuilder()
    .setName('ban')
    .setDescription('ban a user')
    .addMentionableOption(option => option.setName('utilisateur').setDescription('Banni un utilisateur').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Raison du bannissement')),

    async execute (interaction){
        const userBan = interaction.options.getMentionable('utilisateur')
        const reason = interaction.options.getString('reason')
        const embed = func.getEmbed(interaction)
        if(!func.isMod(interaction)){
            return await interaction.reply({embeds : [func.notMod(interaction)]})  
        }
        if(interaction.user == userBan){
            return await interaction.reply({embeds : [func.notMod(interaction).setTitle("T'as voulu te ban toi même c'est fort")]})
        }   
        if(userBan.roles.cache.some(role => role.name === 'Modérateur') || userBan.permissions.has(Permissions.FLAGS.ADMINISTRATOR, false)){
            return await interaction.reply({embeds : [func.notMod(interaction).setTitle('Pourquoi ban un Administrateur ? ')]})
        }
        try{ 
            embed.addField('ID : ', userBan.id)
            if(reason){
                embed.setDescription(`Pour la raison suivante : ${reason}`)
                userBan.ban({deleteMessageDays : 7, reason : reason})
                .then(banInfo => {
                    embed.setTitle(`${banInfo.user} a bien été banni`)
                })     
            }else{
                userBan.ban({deleteMessageDays : 7, reason : ''})
            }
           
        } catch(error){
            console.log(error)
            return await interaction.reply({embeds : [embed]}) 
        }
        return await interaction.reply({embeds : [embed]}) 
    }
}