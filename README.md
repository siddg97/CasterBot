# CasterBot
- Discord Bot Project - Siddharth Gupta & Darrick He
- We live in a city called Raincouver where we need to worry about sudden weather changes and we thought it would be nice to implement our own discord bot to help everyone out with this issue.

## File Architecture:
  - 3 files:
    - **`auth.json`**: Contains the bot Token.
    - **`package.json`**: Contains program description for node.js. Contains name, description, scripts etc.
    - **`bot.js`**: Main chat bot subroutine
## User stories:
  1. __?weather `cityName`__ : CasterBot returns the temperature[Kelvin], humidity and a weather icon.
  2. __?weather celsius `cityName`__ : CasterBot returns Temperature[in Celsius], humidity and a weather icon.
  3. __?weather fahrenheit `cityName`__ : CasterBot returns Temperature[in Farenheit], humidity and a weather icon.
  4. __?five day cast `cityName`__ : CasterBot returns next 5 days of weather stats
  5. __?cast for tomorrow `cityName`__ : CasterBot returns next days weather stats
  6. __?umbrella today `cityName`__ : CasterBot return a "carry an umbrella, you might need it!" if its raining, else returns "dont think so"


## Documentation(s) of API(s):
  - discord.io - __https://izy521.gitbooks.io/discord-io/content/__ - * *Discord API* *
  - OWM - __https://openweathermap.org/appid__ - * *OpenWeatherMap API* *

## OWM API:
- Code of Conduct OWM:
	- Not recommended to use more than once every 10 minutes due to data being updated on server in 10 minute increments
	- server name __`api.openweathermap.org`__. **NEVER** use the IP address of the server.
	- Make API call using `cityID` if possible instead cityName, coordinates and zipcode. List of city ids is in the __`city.list.json`__ file
	-In the words of the OWM website:
	>Please, mind that Free and Startup accounts have limited service availability. If you do not receive a response from the API, please, wait at least for 10 min and then repeat your request. We also recommend you to store your previous request.
	- OWM subscription:
	>After a certain amount of API call we will get a block from OWM and we will requiere to switch to a paid subscription. Block will be notified using a response to an API call. Respone format:
	
```
    {
	"cod": 429,
	"message": "Your account is temporary blocked due to exceeding of requests limitation of your subscription type. Please choose the proper subscription http://openweathermap.org/price"
    }
```
- Examples of API Calls:
	1. OWM Current Data API: Get current weather data for a certain `cityName`.

- **_Syntax_**:
	- `api.openweathermap.org/data/2.5/weather?q=`cityName`&appid=`appId``
- E.g.
	> api.openweathermap.org/data/2.5/weather?q=London&appid=`**********`

## NOTE: 
- It is recommended to use `cityId`instead of `cityName`. We are going to use `cityName` and `cityId` as key-value pairs and will look up `city.list.json` for a coressponding `cityId`. If `cityId` is **NOT** found then we use the API call with `cityName`. we can call API with a `cityId` as follows:

- **_Syntax_**:
	- `api.openweathermap.org/data/2.5/weather?id=`cityId`&appid=`appId
- E.g.
	> api.openweathermap.org/data/2.5/weather?id=2172797&appid=`**********`
		
## Format of JSON response:
  ```
  {
	"coord": {
		"lon": City longitude
		"lat": City latitude
	}
	"weather": {
		"id": Weather Condition ID
		"main": Weather Parameter(s)
		"description": Condition of weather parameter(S)
		"icon": Weather icon id
	}
	"base": Internal parameter
	"main": {
		"temp": Temperature [Kelvin]
		"pressure": Pressure on sea level or hPa
		"humidity": Humidity percentage
		"temp_min": Min. Temp. [Kelvin]
		"temp_max": Max. Temp. [Kelvin]
		"sea_level": Pressure on sea level [hPa]
		"grnd_level": Pressure on ground level [hPa]
	}
	"wind": {
		"speed": Wind Speed [m/s]
		"deg": Wind direction [meteorological degrees]
	}
	"clouds": {
		"all": Cloudiness %
	}
	"rain": {
		"1h": Rain volume for the last hour
		"3h": Rain volume for the last 3 hours
	}
	"snow": {
		"1h": Snow volume for the last hour
		"3h": Snow volume for the last 3 hours
	}
	"dt": Time of data computation [unix, UTC]
	"sys": {
		"type": Internal parameter
		"id": Internal parameter
		"message": Internal parameter
		"country": Country Code
		"sunrise": Sunrise time [unix, UTC]
		"sunset": Sunset time [unix, UTC]
	}
	"id": City ID
	"name": City Name
	"cod": Internal parameter
  }
```
# Temperature is available in Fahrenheit, Celsius and Kelvin units.

  - For temperature in Fahrenheit use 
  	> units=imperial
 
  - For temperature in Celsius use 
  	>units=metric
  
  #### Temperature in Kelvin is used by default, no need to use units parameter in API call
  
  - List of all API parameters with units is avialable [here](openweathermap.org/weather-data)

- **_Syntax_**:
	- `api.openweathermap.org/data/2.5/find?q=`cityId`&units=`unitFormat`&appid=`appId
	- `unitFormat` = "imperial" or "metric"


## HTTP Call to get data from OWM [The Atomic unit of the OWM API Call]

- Data is sent using the `POST` method and data can be recieved using the `GET` method.

- __We are going to be using a `GET` request__

- Steps for an HTTP call for CasterBot:
	1. Make sure you have the __request__ mosule installed through npm and included in the __package.json__ file
	 	To install (and save to package.json) run the command below in the terminal (in the root diresctory of CasterBot)
		> ` npm install request --save `
	2. Import the __request__ module where you want to make a call to an API
		> ` let request = require('request'); `
	3. Set up the request function with a callback function:
	```
	// url needs to be parsed before passing through the function
	request(url, function(err, response, body) {
		if(err){ // print error message if request returns an error
			console.log('ERROR:',error);
		}
		else {	// printing out the json response to the console
			console.log(body);
		}
	});
	
	```

## discord.io API Usage:

- ### Installation:
	- In your terminal, navigate to the root directory of the repository and run the command:
> `npm install discord.io --save`

- Running:

```

// Create the Discord object
var Discord = require('discord.io');

// Create the Bot object
var Bot = new Discord.Client({
	autorun: true,
	token: "CasterBot-token"
});

// Print message to console after Bot is "online" [Executing]
Bot.on('ready', function(event){
	console.log('Logged in as Bot:\n Username: %s - ID: %s', Bot.username, Bot.id);
});

// After recieveing message Bot executes this function
Bot.on('message', function(user, userID, channelID, message, event) {
	if(message === "some-prompt") {
		// Do Something: Most likely send a message or call some other fucntions etc.
		Bot.sendMessage({
			to: channelID,
			message: "some-message"
		});
	}
});

```

- About the API: 
	- Constructor:
		- 4 members:
			1. `token` : __[Required]__ CasterBot account Token
			2. `autorun`: __[Optional]__ if `true` then Bot connects automaically, else need to call Bot.connect(). Default value is `false`.
			3. `messageCacheLimit` : __[Optional]__ number of messages to store in background. Range 0 [no Cache] to null [infintie cache].
			4. `shard` : __[Optional]__ array of 2 numbers [`shardID`,`# of shards`].
			
			
		```
		// EXAMPLE:
		new Discord.Client({
			token:"token",
			autorun: false,
			messageCacheLimit: 50,
			shard: [0, 2]
		});

		```
	- Properties: __[non-method members]__

		| Property | Type | Description |
		| --- | --- | --- |
		| `id` | `String` | Client's iD as a string |
		| `username` | `String` | CLient's username |
		| `email` | `String` | Client's email |
		| `discriminator` | 'Number' | 4 digit number to differentiate users with the same username |
		| `avatar` | `String` | Clients avatar hash |
		| `bot` | `Boolean` | Indicates a bot or a user |
		| `verified` | `Boolean` | Discord verification state |
		| `connected` | `Boolean` | Connection status |
		| `presenceStatus` | `String` | "ofline", "idle" or "online" |

	- Methods:

		| Method | Syntax | Description |
		| --- | --- | --- |
		| `sendMessage` | `bot.sendMessage({opts}, callback);` | send a message to a channel or userID |
		| `uploadFile` | `bot.uploadFile({opts}, callback);` | Upload to a given channelID or UserID |
		| `getMessage` | `bot.getMessage({opts}, callback);` | get a message from a given channel |
		| `getMessages`| `bot.getMessages({opts}, callback);` | get an array of messages from given channel |
		| `simulateTyping` | `bot.simulateTyping(channelID, callback);` | Simulate the bot typing in the given channel |

		```

		// opts for sendMessage(): [callback is optional]
		{
			to : "channelID/User ID",
			message : "some-message",
			tts : "optional boolean - speak message by Discord or not",
			typing : "optional boolean -typing or not typing",
		}

		// opts for getMessage(): [callback is optional]
		{
			channelID: "channelID/UserID",
			messageID: "messageID"
		}

		// opts for getMessages(): [callback is optional]
		{
			channelID: "channelID/UserID",
			before: "messageID" [OPTIONAL]
			after: "messageID" [OPTIONAL],
			limit: "some-number" [OPTIONAL - DEFAULT = 50; MAX = 100]
		}

		// opts for uploadFile(): [callback is optional]
		{
			to: "channelID/UserID",
			file: "filename/buffer",
			filename: "name" [OPTIONAL]
			message: "message along with file" [OPTIONAL]
		}


		```

	- Events:

		| Event | Syntax | Description |
		| --- | --- | --- |
		| `ready` | `client.on('ready', function(event){// Do Something});` | Signals library has connected, recieved and sorted all immediate data and is now ready |
		| `message` | `client.on('message', function(user, userID, channelID, message, event) {// Do something});` | **user**: username, **userID**: userID, **channelID**: channelID, **message**: "message-recieved" |

	- More on __discord.io__ [here](https://izy521.gitbooks.io/discord-io/content/)



### Documentation By :-
>Siddharth Gupta

