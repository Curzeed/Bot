const {SlashCommandBuilder} = require('@discordjs/builders');
const func = require('../../functions/functions')

module.exports = {
 
    data : new SlashCommandBuilder()
    .setName('clear')
    .setDescription('deleting messages')
    .addIntegerOption(option => option.setName('number').setRequired(true).setDescription('Nombre de messages à supprimer'))
    .addMentionableOption(option => option.setName('target').setDescription('Cible pour supprimer ses messages').setRequired(false)),
 
    async execute (interaction) {
        const nbrMessages = interaction.options.getInteger('number');
        const targetDelete = interaction.options.getMentionable('target');
        const messages = interaction.channel.messages.fetch();
        if(!func.isMod(interaction)){
            return await interaction.reply({embeds : [func.notMod(interaction)]})  
        }
        if(nbrMessages > 200) return await interaction.reply({content : 'Je ne peux pas supprimer + de 100 messages à la fois !', ephemeral : true})
        function isDefine(targetDelete){
            if(targetDelete === null) return false;
            else return true;
        }
        try {
            if(targetDelete !== null){
                const targetMessages = (await messages).filter((m) => m.author.id === targetDelete.id)
                await interaction.channel.bulkDelete(targetMessages, true);
                return await interaction.reply({content : `J'ai delete ${nbrMessages} messages de ${targetDelete.user.username}! `, ephemeral : true})
            }else{
                interaction.channel.bulkDelete(nbrMessages,true)
                return await interaction.reply({content : `J'ai delete ${nbrMessages} messages ! `, ephemeral : true})
            }
        } catch (error) {
            console.log(error)
            return await interaction.reply({content : 'Erreur lors du clear', ephemeral : true})
        }
            
    }
}