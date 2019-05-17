var Discord = require('discord.io');
var auth = require('./data/auth.json');
let request = require('request');               // calling HTTP request - API dependency
var modules = require('./modules/modules.js');  // modules implemented for use by CasterBot




// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});


// Print message to console when CasterBot is "ready" i.e. CasterBot is online and connected to Discord
bot.on('ready', function (evt) {
    console.log('\nConnected!!!\n');
    console.log('Logged in as:\n');
    console.log(bot.username + ' - (ID: ' + bot.id + ')');
});

// CasterBot recieves a message in a channel or by a user.
bot.on('message', function (user, userID, channelID, message, evt) {
    // It will listen for messages
    if(modules.isCommand(message)){ // if message starts with a '?'
        var cmd = modules.splitCommand(message); // cmd is an array of command words
        let cityName = cmd[cmd.length-1];
        //console.log(cmd); //DEBUGGING*****************
        var pureCmd = cmd;
        pureCmd.pop(); // now we only have the command words
        var cmdIndex = modules.getCmdIndex(pureCmd); // index of command corresponding to "commands.json" file
        if(cmdIndex == -1){     // prompted but command not recognized
            bot.sendMessage({
                to: channelID,
                message: "I think the message you sent has a typo!!\n Try again and follow the syntax of commads I support\n",
                typing: true
            });
        }
        else {
            var url = modules.getURL(cmdIndex, cityName); // generate URL for API call
            //console.log(url); //DEBUGGING*****************
            request(url, function(err, response, body){
                if(err){ // if error occurs
                    bot.sendMessage({
                        to: channelID,
                        message: "city not found! Try again and check if you spelled the city correctly!",
                        typing: true
                    });
                }
                else {  // CasterBot generates meesage and send it
                    var weather = JSON.parse(body);
                    //console.log(body); //DEBUGGING*****************
                    let msg = modules.getMessage(weather);  // generate message 
                    bot.sendMessage({
                        to: channelID,
                        message: msg,
                        typing: true
                    });
                }
            });  
        }
    }
});

