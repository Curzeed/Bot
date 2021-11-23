const {SlashCommandBuilder} = require('@discordjs/builders');
const { Client, Intents, Collection } = require('discord.js');
const {MessageEmbed} = require("discord.js");
var embedMes = new MessageEmbed();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Replies with user infos'),

    async execute(interaction) {
        var userDs;
        const channel = interaction.channel;

        await interaction.user.fetch(true).then(function(data) {
            var userid = data;
            console.log(userid);
            userDs = userid;
            return userid;
        });

        console.log(userDs);
        embedMes.setImage(userDs.avatarURL());
        embedMes.setThumbnail(userDs.avatarURL());
        embedMes.setTitle(userDs.username);
        embedMes.setColor(userDs.hexAccentColor);
        //embedMes.setDescription('Aller chercher une api de mots gentil');


        channel.send({embeds: [embedMes]});
    }
}
