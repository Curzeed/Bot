const {SlashCommandBuilder} = require('@discordjs/builders');
const func = require('../../functions/functions')
module.exports = {
 
    data : new SlashCommandBuilder()
    .setName('pause')
    .setDescription('pause the current queue'),
 
    async execute (interaction, player) {
        const queue = player.getQueue(interaction.guildId)
        if(!func.inSameVoice(interaction)){
            return await interaction.reply({content : "Je ne suis pas dans le même salon vocal que toi !"})
        }
        if(!func.inVoice(interaction)){
            return await interaction.reply({content : "Tu n'es pas dans un salon vocal !"})
        }
        if(!queue || !queue.playing){
            return void interaction.reply({
                content: '❌ | No music is being played!',
            });
        }
        const success = queue.setPaused(true);
        return void interaction.reply({
            content: success ? '⏸ | Paused!' : '❌ | Something went wrong!',
          });
    }
}