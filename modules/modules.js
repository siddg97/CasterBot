var commands = require('../data/commands.json'); // import supported commands
var auth = require('../data/auth.json'); 	// extract API key for OWM API
var cityMap = require('../data/city.list.json'); // extract file with city details

// URL constant strings
let server = 'http://api.openweathermap.org/data/2.5/weather?'; //first part of url
let appKey = '&appid='+auth.appId; // third part of URL
let funit  = '&units=imperial';
let cunit  = '&units=metric';


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
	if(index == 0){
		return server+missingUrl+appKey;
	}
	else if(index==1){
		return server+missingUrl+cunit+appKey;
	}
	else if(index==2){
		return server+missingUrl+funit+appKey;
	}
	// }
}

// Weather in Vancouver:

// 14 degrees Celsius
// Light Rain :cloud_rain:
// 76% Humidity
// High: 18 Celsius
// Low: 13 Celsius


// takes in json response and return a message string.
module.exports.getMessage = function(body,unit){
	if(unit=='k'){
		var u = 'Kelvin';
	} else if(unit=='c'){
		var u = 'Celsius';
	} else if(unit=='f'){
		var u = 'Fahrenheit';
	}
	let temp = body.main.temp;
	let cloudy = body.clouds.all+'% ';
	let humidity = body.main.humidity+'% ';
	let min_temp = body.main.temp_min;
	let max_temp = body.main.temp_max;
	let pressr = body.main.pressure;
	let wind_speed = body.wind.speed;
	let city = body.name;
	let wmain = body.weather[0].main;
	let wdesc = body.weather[0].description;
	return '```Weather in '+city+':```**'+temp+'**  Degree  '+u+'\n**'+humidity+'**  Humidity\n**'+max_temp+'**  Degree  '+u+'  __High__\n**'+min_temp+'**  Degree  '+u+'  __Low__\n**'+pressr+' hPa **  `Sea level Pressure`\n**'+wind_speed+' m/s **  `Wind Speed`\n\n```Conditions: '+wdesc+'```**'+cloudy+'**  *Clouds*';
}