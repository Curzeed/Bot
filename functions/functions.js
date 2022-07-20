const {MessageEmbed} = require("discord.js");
const discord = require('discord.js');

module.exports = {
    /**
     * Return an EmbedMessage 
     * @param {*} interaction 
     * @returns 
     */
    getEmbed : function(interaction) {
        const embed = new MessageEmbed()
        .setAuthor(interaction.user.username)
        // Ajouter une image / thumbnail
        .setTimestamp()
        return embed;
    },
    /**
     * return boolean to determine if the user is Admin
     * @param {*} user 
     */
    isMod : function(interaction){
        if(interaction.member.roles.cache.some(role => role.name === 'NASA' || role.name === 'Modérateur')) return true;
        if(interaction.member.roles === undefined) return false;
        else return false;
    },
    /**
     * return template embed for acting on a mod & admin
     * @param {*} interaction 
     * @returns 
     */
    notMod : function(interaction){
        const embed = new MessageEmbed()
        .setAuthor(interaction.user.username)
        .setTitle("Tu n'as pas les permissions pour effectuer cette action !")
        .setDescription("Tu devrais demander à une personne qui peut le faire, tu n'en est malheureusement pas capable")
        .setImage('https://pbs.twimg.com/media/FMKAirOX0AMdQHa.jpg')
        .setTimestamp()
        .setColor('RED')
      return embed;  
    },
    inSameVoice : function(interaction){
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) {
            return false
          }else return true;
    },
    inVoice : function(interaction){
        if(interaction.member.voice.channel){
            return true;
        }else return false
    }
}