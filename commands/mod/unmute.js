const {SlashCommandBuilder} = require('@discordjs/builders');
const func = require('../../functions/functions')
const { Permissions } = require('discord.js');

module.exports = {
 
    data : new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Demute une personne')
    .addMentionableOption(option => option.setName('user').setRequired(true).setDescription('Cible')),
 
    async execute (interaction) {
        const userMute = interaction.options.getMentionable('user')
        const embed = func.getEmbed(interaction);
        if(!func.isMod(interaction)){
            return await interaction.reply({content : ' ', embeds : [func.notMod(interaction)]})  
        }
        if(interaction.user == userMute){
            return await interaction.reply({content : ' ', embeds : [func.notMod(interaction).setTitle("Pourquoi se demute lorsqu'on peut écrire..")]})
        }   
        // verify if target is not muted
        if(!userMute.roles.cache.some(role => role.name === 'muted')){
            embed.setTitle(`${userMute.user.username} n'est pas mute`)
            embed.setThumbnail(userMute.user.displayAvatarURL())
            return await interaction.reply({content : ' ', embeds : [embed]}) 
        }
        // Verify if target user is admin or mod
        if(userMute.roles.cache.some(role => role.name === 'Modérateur') || userMute.permissions.has(Permissions.FLAGS.ADMINISTRATOR, false)){
            return await interaction.reply({content : ' ', embeds : [func.notMod(interaction).setTitle('Il ne peut pas être mute, un effort est requis..')]})
        }
        const mutedRole = interaction.guild.roles.cache.find(r => r.id == "990711615722778634")

        try{
            userMute.roles.remove(mutedRole)
            embed.setThumbnail(userMute.user.displayAvatarURL())
            embed.setTitle(`${userMute.user.username} a retrouvé la parole !`)
            embed.setColor('GREEN')
        }catch (error){
            console.log(error)
            interaction.reply('Une erreur est survenue lors du mute')
            throw error
        }
        return await interaction.reply({content : ' ', embeds : [embed]}) 
    }
}