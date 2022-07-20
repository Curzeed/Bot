const {SlashCommandBuilder} = require('@discordjs/builders');
const { Client, Intents, Collection } = require('discord.js');
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Replies with user infos'),
    async execute(interaction) {
        var userDs;
        
        const channel = interaction.channel;
        await interaction.user.fetch(true).then(function(data) {
            var userid = data;
            userDs = userid;
            return userid;
        });
        let dateAcc = userDs.createdAt.toLocaleDateString('fr-FR');
        const embedMes = new MessageEmbed()
        .setFooter("T'es le meilleur",userDs.avatarURL())
        .setThumbnail(userDs.avatarURL())
        .setTitle(userDs.username)
        .setColor(userDs.hexAccentColor)
        .setTimestamp()
        .addField('**Compte crée le : **\n',`${dateAcc}`)
        .addField('Bot : ',userDs.bot ? ':white_check_mark:' : ':no_entry_sign:');
        
        await interaction.reply({ content : ' ', embeds : [embedMes]});
    }
}
