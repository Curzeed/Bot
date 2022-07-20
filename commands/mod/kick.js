const {SlashCommandBuilder} = require('@discordjs/builders');
const Embed = require('../../functions/functions')

module.exports = {
    data : new SlashCommandBuilder()
    .setName('kick')
    .setDescription('kick a user')
    .addMentionableOption(option => option.setName('utilisateur').setDescription('Banni un utilisateur').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Raison du bannissement')),

    async execute (interaction){
        const userKick = interaction.options.getMentionable('utilisateur')
        const reason = interaction.options.getString('reason')
        if(!Embed.isMod(interaction)){
            return await interaction.reply({embeds : [Embed.notMod(interaction)]})  
        }
        if(interaction.user == userBan){
            return await interaction.reply({embeds : [func.notMod(interaction).setTitle("T'as voulu te kick tout seul c'est fort")]})
        }
        if(userKick.roles.cache.some(role => role.name === 'Modérateur') || userKick.permissions.has(Permissions.FLAGS.ADMINISTRATOR, false)){
            return await interaction.reply({embeds : [func.notMod(interaction).setTitle('Pourquoi mute un Administrateur ? ')]})
        }
        const embed = Embed.getEmbed(interaction);
        try{
            embed.setTitle(`L'utilisateur ${userKick.username} a bien été expulsé !`)
            embed.setThumbnail(userMute.user.displayAvatarURL())
            embed.addField('ID : ', userKick.id)
            embed.setColor('GREEN')
            if(reason){    
                embed.setDescription(`Pour la raison suivante : \n ${reason}`)   
                await userKick.kick(reason)
            }else{
                embed.setDescription(`Aucune raison de cette expulsion (un abus de pouvoir probablement)`)
                await userKick.kick()
            }  
        } catch(error){
            embed.setColor('RED')
            embed.setTitle(`Un problème est survenu lors de l'expulsion`) 
        }
        return await interaction.reply({embeds : [embed]})
    }
}    