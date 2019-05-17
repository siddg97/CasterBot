var commands = require('../data/commands.json'); // import supported commands
var auth = require('../data/auth.json'); 	// extract API key for OWM API
var cityMap = require('../data/city.list.json'); // extract file with city details

// URL constant strings
let server = 'http://api.openweathermap.org/data/2.5/weather?'; //first part of url
let appKey = '&appid='+auth.appId; // third part of URL


// we can check if message recieved is a command for the bot or not
module.exports.isCommand = function (message){
	if(message.substring(0,1) == '?'){
		return true;
	}
	else return false;
}

// takes in the message and returns an array with words of the message [not including the prompt '?']
module.exports.splitCommand = function(message) {
	var pureMsg = message.substring(1);
	return pureMsg.split(' ');
}

// compare 2 command arrays and return true if they are equal else false
function compareCmd(c1, c2){
	if(JSON.stringify(c1) == JSON.stringify(c2))
		return true;
	return false;
}

// Return the index of the command [corresponds to index in "commands.json"] if no command found then return -1
module.exports.getCmdIndex = function(arrCmd){
	for (var i=0; i < commands.length; i++) {
		if(compareCmd(arrCmd, commands[i])){
			return i;
		}
	}
	return -1;
}

// Takes city anme and returns corresponding city id
function lookUpCitId(cityName){
	for (var i=0; i < cityMap.length; i++) {
		if(cityMap[i].name.toLowerCase() == cityName.toLowerCase()){
			return cityMap[i].id;
		}
	}
	return '#';  // if ciy id is not found - edge case
}

// takes in command index and city name and genreates specific URL for the API call
module.exports.getURL = function(index, name){
	var missingUrl = "";
	var cityId = lookUpCitId(name);	// either '#' or has cityId
	if(cityId == '#'){
		missingUrl = "q="+name;
	}
	else{
		missingUrl = "id="+cityId;
	}
	// if(index == 0){
	let url = server+missingUrl+appKey;
	return url;
	// }
}

// takes in json response and return a message string.
module.exports.getMessage = function(body){
	let t = body.main.temp+' Kelvin ';
	let h = body.main.humidity+'% ';
	let city = body.name;
	return 'Weather in '+city+' :\n'+'Temperature is '+t+'and humidity is '+h+'!';
}


