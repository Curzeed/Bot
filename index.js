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
	console.log('Ready!');
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

// Login to Discord with your client's token
client.login(token);