const {SlashCommandBuilder} = require('@discordjs/builders');
module.exports = {
 
    data : new SlashCommandBuilder()
    .setName('skip')
    .setDescription('skip current song'),
 
    async execute (interaction, player) {
        
        if (!interaction.member.voice.channel) {
            return void interaction.reply({
              content: 'You are not in a voice channel!',
              ephemeral: true,
            });
          }
        await interaction.deferReply()
        const queue = player.getQueue(interaction.guildId)
        if (!queue || !queue.playing)return void interaction.followUp({content: '❌ | No music is being played!'});
        const currentTrack = queue.current;
        const success = queue.skip();
        return void interaction.followUp({
            content : success ? `✅ | Skipped **${currentTrack}**!` : '❌ | Something went wrong!'
        })
    }
}