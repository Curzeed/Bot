const {SlashCommandBuilder} = require('@discordjs/builders');
const func = require('../../functions/functions')
const { Permissions } = require('discord.js');
module.exports = {
 
    data : new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute un utilisateur')
    .addMentionableOption(option => option.setName('user').setRequired(true).setDescription('Cible'))
    .addStringOption(option => option.setName('reason').setRequired(false).setDescription('Raison du mute')),
 
    async execute (interaction) {
        const embed = func.getEmbed(interaction);
        if(!func.isMod(interaction)){
            return await interaction.reply({content : ' ', embeds : [func.notMod(interaction)]})  
        }
        const userMute = interaction.options.getMentionable('user')
        const reason = interaction.options.getString('reason')
        if(interaction.user == userMute){
            return await interaction.reply({content : ' ', embeds : [func.notMod(interaction).setTitle("Pourquoi s'automute ?")]})
        }      
        if(userMute.roles.cache.some(role => role.name === 'muted')){
            embed.setTitle(`${userMute.user.username} est déjà mute !`)
            embed.setThumbnail(userMute.user.displayAvatarURL())
            return await interaction.reply({content : ' ', embeds : [embed]}) 
        }
        if(userMute.roles.cache.some(role => role.name === 'Modérateur') || userMute.permissions.has(Permissions.FLAGS.ADMINISTRATOR, false)){
            return await interaction.reply({content : ' ', embeds : [func.notMod(interaction).setTitle('Pourquoi mute un Administrateur ? ')]})
        }
        // DS HAO const mutedRole = interaction.guild.roles.cache.find(r => r.id == "810253832146911272")
        const mutedRole = interaction.guild.roles.cache.find(r => r.id == "990711615722778634")
        try{
            userMute.roles.add(mutedRole)
            embed.setThumbnail(userMute.user.displayAvatarURL())
            embed.setTitle(`${userMute.user.username} a bien été mute !`)
            embed.setColor('GREEN')
            if(reason ){
                embed.setDescription(`Pour la raison suivante : ${reason}`)           
            }
        }catch (error){
            console.log(error)
            interaction.reply('Une erreur est survenue lors du mute')
            throw error
        }
        return await interaction.reply({content : ' ', embeds : [embed]}) 
    }
}
