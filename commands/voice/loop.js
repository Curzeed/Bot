const {SlashCommandBuilder} = require('@discordjs/builders');
const {QueueRepeatMode} = require('discord-player');
const func = require('../../functions/functions')
module.exports = {
 
    data : new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Set loop mode')
    ,
 
    async execute (interaction, player) {
        const queue = player.getQueue(interaction.guildId)
        if(!func.inSameVoice(interaction)){
            return await interaction.reply({content : "Je ne suis pas dans le même salon vocal que toi !"})
        }
        if(!func.inVoice(interaction)){
            return await interaction.reply({content : "Tu n'es pas dans un salon vocal !"})
        }
        await interaction.deferReply();  
        if (!queue || !queue.playing) {
            return void interaction.followUp({content: '❌ | No music is being played!'});
        }
        if(queue.repeatMode == QueueRepeatMode.TRACK){
            queue.setRepeatMode(QueueRepeatMode.OFF)
            return void interaction.reply({
                content: `▶ | Updated loop mode!` ,
            })
        }
        
        const loopMode = QueueRepeatMode.TRACK
        const success = queue.setRepeatMode(loopMode)
        const mode = loopMode === QueueRepeatMode.TRACK ? '🔂' : loopMode === QueueRepeatMode.QUEUE ? '🔁' : '▶';
        
        
        return void interaction.followUp({
            content: success ? `${mode} | Updated loop mode!` : '❌ | Could not update loop mode!',
        })
    }
}