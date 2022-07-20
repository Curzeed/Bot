const {SlashCommandBuilder} = require('@discordjs/builders');
 
module.exports = {
 
    data : new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Get the whole queue of current songs'),
 
    async execute (interaction, player) {
        const queue = player.getQueue(interaction.guildId)
        if (typeof(queue) != 'undefined') {
            trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
              return void interaction.reply({
                embeds: [
                  {
                    title: 'Now Playing',
                    description: trimString(`The Current song playing is 🎶 | **${queue.current.title}**! \n 🎶 | **${queue}**! `, 4095),
                  }
                ]
              })
          } else {
            return void interaction.reply({
              content: 'There is no song in the queue!'
            })
          }
    }
}