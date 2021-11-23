const {SlashCommandBuilder} = require('@discordjs/builders');
const { Client, Intents, Collection } = require('discord.js');
const {MessageEmbed} = require("discord.js");
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Replies with user infos'),

    async execute(interaction) {
        var userDs;
        
        const channel = interaction.channel;
        const tabCompliment = ["T'es si beau que j'te sucerai juste pour le goût","T'es si beau que quand je te vois, ma gorge s'élargit","Parfois aux toilettes, je pense à toi, et je bande quand je fais caca",
        "Je traverserai la Méditerranée à la nage pour t'offrir un esclave", "T'es beau comme un coup droit de Roger Federer", "Tu me fais autant rêver qu'un menu Golden",
        "J'aimerais être la chaise sur laquelle tu t'assois", "T'es beaucoup moins con que t'en as l'air"];
        let randomNum = getRandomInt(tabCompliment.length);
        await interaction.user.fetch(true).then(function(data) {
            var userid = data;
            console.log(userid);
            userDs = userid;
            return userid;
        });
        embedMes = new MessageEmbed();
        let dateAcc = userDs.createdAt.toLocaleDateString('fr-FR');
        console.log(userDs);
        embedMes.setFooter("T'es le meilleur",userDs.avatarURL());
        embedMes.setThumbnail(userDs.avatarURL());
        embedMes.setTitle(userDs.username);
        embedMes.setColor(userDs.hexAccentColor);
        embedMes.setDescription(tabCompliment[randomNum]);
        embedMes.setTimestamp();
        embedMes.addField('**Compte crée le : **\n',`${dateAcc}`);
        
        await channel.send({embeds: [embedMes]});
    }
}
