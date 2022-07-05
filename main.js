const Discord = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

const prefix = '!';

client.once('ready', () => {
    console.log('LeagueBot is online!');
});

client.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message,args);
    }
    else if (command === 'search') {
        client.commands.get('search').execute(message,args);
        
    }
}
);

client.login('OTkzMjM1ODY5MDQ3NzE3ODk4.GY0INY.MlTwysjPYcEIh2ShTN4YsHWMF3vB2MFE4UBReA');