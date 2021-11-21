const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replieses with Pong ! '),
    async execute(interaction) {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        interaction.editReply(
            ` Pong ! Et mon ping à moi est : ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
    },
};