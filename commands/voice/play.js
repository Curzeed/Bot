const {SlashCommandBuilder} = require('@discordjs/builders');
const {QueryType } = require("discord-player");
module.exports = {
 
    data : new SlashCommandBuilder()
    .setName('play')
    .setDescription('play a song')
    .addStringOption(option => option.setName('song').setDescription("Jouer une musique sur le bot")),
 
    async execute (interaction , player) {
        await interaction.deferReply();
        const query = interaction.options.getString('song')

        const searchResult = await player.search(query, {
            requestedBy : interaction.user,
            searchEngine : QueryType.AUTO
        })
        .catch((err) => console.log(err))
        if (!searchResult || !searchResult.tracks.length) return void interaction.followUp({ content: "No results were found!" });

        const queue =  player.createQueue(interaction.guild, {
            metadata : interaction.channel
        })
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            void player.deleteQueue(interaction.guild);
            return void interaction.followUp({ content: "Could not join your voice channel!" }); 
        }
        await interaction.followUp({ content: `⏱ | Loading your ${searchResult.playlist ? "playlist" : "track"}...` });
        searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) await queue.play();
        return await interaction.followUp({embeds : [
            {
                title : 'Now Playing',
                description :  `🎶 | **${queue.current.title}**!`
            }
        ]})
    }
}