const {SlashCommandBuilder} = require('@discordjs/builders');
const { DiscordAPIError } = require('@discordjs/rest');
const Embed = require('../../functions/functions')

module.exports = {
    data : new SlashCommandBuilder()
    .setName('unban')
    .setDescription('unban a user')
    .addStringOption(option => option.setName('utilisateur').setDescription('Unban un utilisateur').setRequired(true)),

    async execute (interaction){
        if(!isMod(interaction.user)){
            return await interaction.reply({content : ' ', embeds : [Embed.notMod(interaction)]})  
        }
        const embed = Embed.getEmbed(interaction)
        const idUser = BigInt(interaction.options.getString('utilisateur'))
        
        try{  
            await interaction.guild.members.unban(idUser.toString()).then( user => { 
                embed.setTitle(`L'utilisateur ${user.username} a bien été débanni de ${interaction.guild}`)
                embed.setDescription(`ID : ${user.id}`)
                embed.setColor('GREEN')
            })
            .catch(err => {
                if(err.httpStatus === 404) {
                    embed.setTitle(`Cet utilisateur n'est pas banni`)
                    embed.setColor('RED')
                }
            })
        } catch(error){
            embed.setTitle(`Problème lors du débanissement de : ${user.username}`)
            embed.setColor('RED')
            embed.setDescription(`ID : ${user.id}`)
            
            return await interaction.reply({content : ' ', embeds : [embed]})   
            
        }
        return await interaction.reply({content : ' ', embeds : [embed]})
    }
}