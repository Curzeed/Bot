const {SlashCommandBuilder} = require('@discordjs/builders');
const db = require('../../functions/database')
const canva = require('canvacord')
const {MessageAttachment} = require('discord.js')
module.exports = {
 
    data : new SlashCommandBuilder()
    .setName('rank')
    .setDescription('display rank card')
    .addMentionableOption(option => option.setName('utilisateur').setDescription("Donne le rang d'un utilisateur").setRequired(false)),
 
    async execute (interaction) {
        var user;
        if(interaction.options.getMentionable('utilisateur')){
            user = interaction.options.getMentionable('utilisateur').user
        }else{
            user = interaction.user
        }
        db.singleRank(user.id,(userDb)=>{
            const rankCard = new canva.Rank()
            .setAvatar(user.displayAvatarURL({format : "png", size : 1024}))   
            .setCurrentXP(Number(userDb.currentXp))
            .setRequiredXP(Number(userDb.xpNeeded))
            .setProgressBar("#FFFFFF", "COLOR")
            .setUsername(user.username)
            .setStatus("online")
            .setLevel(Number(userDb.level))
            //.setBackground()
            .setDiscriminator(user.discriminator);
            db.getRank((users)=>{
                const rank = users.map(x => x.id).indexOf(user.id)+1
                rankCard.setRank(rank)
            })
            const img =  rankCard.build().then(
                data => {
                    const attachement = new MessageAttachment(data,"RankCard.png")
                    interaction.reply({files : [attachement]})
                })
        })
    }
}