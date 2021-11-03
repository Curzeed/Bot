const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Replies with user infos'),

    async execute(interaction) {
        await interaction.reply(`Ton tag : ${interaction.user.tag} \n Ton id : ${interaction.user.id}`)
    }
}
