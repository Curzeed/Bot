// Require the necessary discord.js classes
const { Client, Intents, Collection } = require('discord.js');
const { token, twitch_api_key } = require('./config.json');
const fs = require('fs');
const {Player} = require('discord-player');
const ranking = require('./levels/ranking')
const {TwitchOnlineTracker} = require('twitchonlinetracker')
const db = require('./functions/database')
	const tracker = new TwitchOnlineTracker({
		client_id : twitch_api_key,
		track : db.getStreamsTracked(),
		pollInterval : 30,
		debug : true,
		start : true,
	})
tracker.on('live', streamData => {
	console.log(`${streamData.user_name} est en live`)
})
tracker.on('error')
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS] });

client.commands = new Collection();
// system of leveling
ranking(client)
const commandFolders = fs.readdirSync('./commands');

const player = new Player(client);

player.on('error', (queue, error) => {
	console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
  });
  
  player.on('connectionError', (queue, error) => {
	console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
  });
  
  player.on('trackStart', (queue, track) => {
	queue.metadata.send(`▶ | Started playing: **${track.title}** in **${queue.connection.channel.name}**!`);
  });
  
  player.on('trackAdd', (queue, track) => {
	queue.metadata.send(`🎶 | Track **${track.title}** queued!`);
  });
  
  player.on('botDisconnect', queue => {
	queue.metadata.send('❌ | I was manually disconnected from the voice channel, clearing queue!');
  });
  
  player.on('channelEmpty', queue => {
	queue.metadata.send('❌ | Nobody is in the voice channel, leaving...');
  });
  
  player.on('queueEnd', queue => {
	queue.metadata.send('✅ | Queue finished!');
  });

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.data.name, command);
	}
}


// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Je suis lancé!');
});
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;
	if (interaction.commandName == 'skip' ||interaction.commandName == 'play'|| interaction.commandName == 'resume' || interaction.commandName == 'queue' 
	|| interaction.commandName == 'purge' || interaction.commandName == 'loop' || interaction.commandName == 'leave' || interaction.commandName == 'pause' 
	|| interaction.commandName == 'actual' ){
		await command.execute(interaction, player)
	}else{
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'Une erreur a été détectée lors de la commande', ephemeral: true });
		}
	}	
});

client.on('messageCreate', async message => {
	let msg = message.content;
		try{
			if(msg.endsWith('quoi') | msg.trim().endsWith('quoi?')){
				message.reply("feur");
			}else{return;}
			}catch(error){
				console.log(error);
				await message.reply({ content : 'Une erreur a été détectée dans la lecture du message', ephemeral:true});
		}
		
});


// Login to Discord with your client's token
client.login(token);

client.once('ready',() => {
	client.user.setActivity('La WWE', {type: 'COMPETING'});
})
