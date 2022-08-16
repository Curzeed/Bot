const {SlashCommandBuilder} = require('@discordjs/builders');
 
module.exports = {
 
    data : new SlashCommandBuilder()
    .setName('roulette')
    .setDescription('roulette'),
 
    async execute (interaction) {
        let rdmInt  = Math.floor(Math.random() * 6)
        let user = interaction.user;
        let answer
        switch(rdmInt) {
            case 0 : answer = "Ne t'inquiète pas, la chance va tourner";break;
            case 1 : answer = "Les gros comme toi, ça m'a toujours fait rigoler, parce que quand ça dégringole, ça fait un de ces boucans!";break;
            case 2 : answer = "Woayé ! C'est pas passé loin...";break;
            case 3 : answer = "La prochaine c'est pour ta gueule !";break;
            case 4 : answer = "T'es mute oléééé ++ minus";break;
            case 5 : answer = "T'es kick ";
                     user.kick("T'as perdu")
            break;
        }
        interaction.reply(answer)
    }
}