const {SlashCommandBuilder} = require('@discordjs/builders');
 
module.exports = {
 
    data : new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Lance une pièce'),
 
    async execute (interaction) {
 
    }
}