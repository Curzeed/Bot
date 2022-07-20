const {SlashCommandBuilder} = require('@discordjs/builders');
const func = require('../../functions/functions')
const {MessageEmbed} = require("discord.js");

module.exports = {
 
    data : new SlashCommandBuilder()
    .setName('actual')
    .setDescription('Get the song that is currently playing in the queue'),
 
    async execute (interaction, player) {       
        const queue = player.getQueue(interaction.guildId)
        if(!func.inSameVoice(interaction)){
            return await interaction.reply({content : "Je ne suis pas dans le même salon vocal que toi !"})
        }
        if(interaction.guild.me.voice.channel.id == null){
            return await interaction.reply({ content : "Je ne suis pas dans un salon vocal !"})
        }
        if (!queue || !queue.playing){
            return void interaction.reply({
                content: '❌ | No music is being played!',
            });
        }
        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();
        const embed = new MessageEmbed()
        .setTitle('Now playing')
        .setDescription(`🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`)
        .addField('\u200b', progress)
        .setColor(0xffffff)
        return await interaction.reply({embeds : [embed]})
    }
}