var Discord = require('discord.io');
var auth = require('./auth.json');


// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {

    console.log('\nConnected!!!\n');
    console.log('Logged in as: ');
    console.log(bot.username + ' - (ID: ' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `?`
    if (message.substring(0, 1) == '?') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'danda':
                bot.sendMessage({
                    to: channelID,
                    message: 'looney!',
                    typing: true
                });
                break;
            case 'weather':
                bot.sendMessage({
                    to: channelID,
                    message: 'read command: $weather'
                });
                break;
            // Just add any case commands if you want to..
         }
     }
});