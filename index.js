// Require the necessary discord.js classes
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');
const { host, port, user, password, database} = require('./config.json');
const mysql = require('mysql');
const bdd = mysql.createConnection({
	host,port,user,password,database
})

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Create a new rule for DM in 
const schedule = require('node-schedule');
const galrok = client.users.cache.get("193432989177217024");
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [1, new schedule.Range(3,5)]
rule.hour = 14;
// Création d'une collection à l'instance du client
client.commands = new Collection();

// Lecture du fichier en question demandé par le client
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Je suis lancé!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Une erreur a été détectée lors de la commande', ephemeral: true });
	}
});

client.on('messageCreate', async message => {
	console.log('e');
	let msg = message.content;
		try{
			if(msg.endsWith('quoi')){
				msg.reply("feur");
			}else{
				return;
			}

			}catch(error){
				console.log(error);
				await msg.reply({ content : 'Une erreur a été détectée dans la lecture du message', ephemeral:true});
		}
});
//const job = schedule.scheduleJob("MpGalrok",rule,function(){
//	galrok.send("Va faire les scores flemmard");
//})

// Login to Discord with your client's token
client.login(token);

client.once('ready',() => {
	client.user.setActivity('La WWE', {type: 'COMPETING'});
})
