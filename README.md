# CasterBot
Discord Bot Project - Siddharth Gupta & Darrick He

## File Architecture:
  - 3 files:
    - **`auth.json`**: Contains the bot Token.
    - **`package.json`**: Contains program description for node.js. Contains name, description, scripts etc.
    - **`bot.js`**: Main chat bot subroutine
## User stories:
  1. __$`cityName`__ : CasterBot returns the temperature[Kelvin], humidity and a weather icon.
  2. __$`cityName` celsius__ : CasterBot returns Temperature[in Celsius], humidity and a weather icon.
  3. __$`cityName` farenheit__ : CasterBot returns Temperature[in Farenheit], humidity and a weather icon.
  4. __$five day cast `cityName`__ : CasterBot returns next 5 days of weather stats
  5. __$cast for tomorrow `cityName`__ : CasterBot returns next days weather stats


## Documentation(s)
  - https://izy521.gitbooks.io/discord-io/content/ - Discord API
  - https://openweathermap.org/appid - OpenWeatherMap API

## OWM API:
- Code of Conduct OWM:
	- Not recommended to use more than once every 10 minutes due to data being updated on server in 10 minute increments
	- server name __`api.openweathermap.org`__.**NEVER** use the IP address of the server.
	- Make API call using `cityID` if possible instead cityName, coordinates and zipcode. List of city ids is in the __`city.list.json`__ file
	-In the words of the OWM website:
	>Please, mind that Free and Startup accounts have limited service availability. If you do not receive a response from the API, please, wait at least for 10 min and then repeat your request. We also recommend you to store your previous request.
	- OWM subscription:
	>After a certain amount of API call we will get a block from OWM and we will requiere to switch to a paid subscription. Block will be notified using a response to an API call. Respone format:
	
`{
	"cod": 429,
	"message": "Your account is temporary blocked due to exceeding of requests limitation of your subscription type. Please choose the proper subscription http://openweathermap.org/price"
}
`
- Examples of API Calls:
	1. OWM Current Data API: Get current weather data for a certain `cityName`.
		**_Syntax_**:
			api.openweathermap.org/data/2.5/weather?q=`cityName`
		E.g.
		> api.openweathermap.org/data/2.5/weather?q=London

## NOTE: 
- It is recommended to use `cityId`instead of `cityName`. We are going to use `cityName` and `cityId` as key-value pairs and will look up `city.list.json` for a coressponding `cityId`. If `cityId` is **NOT** found then we use the API call with `cityName`. we can call API with a `cityId` as follows:
	**_Syntax_**:
		api.openweathermap.org/data/2.5/weather?id=`cityId`
	E.g.
	> api.openweathermap.org/data/2.5/weather?id=2172797
		
- Format of JSON response:
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

# Temperature is available in Fahrenheit, Celsius and Kelvin units.

  - For temperature in Fahrenheit use 
  	> units=imperial
 
  - For temperature in Celsius use 
  	>units=metric
  
  #### Temperature in Kelvin is used by default, no need to use units parameter in API call
  
  - List of all API parameters with units __openweathermap.org/weather-data__
	**_Syntax_**:
		api.openweathermap.org/data/2.5/find?q=`cityId`&units=`unitFormat`

	- `unitFormat` = "imperial" or "metric"

`       
## Darrick He
##     &
## Siddharth Gupta
`
