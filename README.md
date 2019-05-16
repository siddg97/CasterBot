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

-**_Syntax_**:
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

# Temperature is available in Fahrenheit, Celsius and Kelvin units.

  - For temperature in Fahrenheit use 
  	> units=imperial
 
  - For temperature in Celsius use 
  	>units=metric
  
  #### Temperature in Kelvin is used by default, no need to use units parameter in API call
  
  - List of all API parameters with units is avialable [here](openweathermap.org/weather-data)

-**_Syntax_**:
	- `api.openweathermap.org/data/2.5/find?q=`cityId`&units=`unitFormat`&appid=`appId
	- `unitFormat` = "imperial" or "metric"


## AJAX HTTP Call to get data from OWM [The Atomic unit of the OWM API Call]

- AJAX is one of the most traditional ways to make an HTTP request. Data is sent using the `POST` method and data can be recieved using the `GET` method.

- __We are going to be using a `GET` request__

- Steps for an HTTP call in AJAX:
	1. __Initialize a new `XMLHttpRequest()` method__
	2. __Specify URL endpoint [destination] and specify HTTP method [`GET` in our case]__
	3. __Use `open()` method to bind HTTP method and URL__
	4. __Call `send()` method to ~~"Shoot your shot"~~ send your request__

- We record the HTTP response by using the `onreadystatechange` property of `XMLHttpRequest`. `onreadystatechange` consists the __event handler__ to be executed when `readystatechanged` event occurs.

- `onreadystatechange` has 2 methods which we can use to check status of our HTTP request:
	- `readyState` __[this.readyState]__ : Return state of the `XMLHttpRequest` Client

		| Return Val | State | Inference |
		| --- | --- | --- |
		| 0 | **UNSENT** | `open()` not been called yet |
		| 1 | **OPENED** | `open()` has been called |
		| 2 | **HEADERS_RECIEVED** | `send()` has been called |
		| 3 | **LOADING** | Downloading data to `responseText` |
		| 4 | **DONE** | Download complete |
	
	- `status` __[this.status]__ : Returns a status code of the HTTP response

		| Return Val | Status |
		| --- | --- |
		| 0 | **UNSENT** or **OPENED** |
		| 200 | **LOADING** or **DONE** |
	- More about `XMLHttpRequest` objects [here](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#Constructor)

	- `responseText`__[this.responseText]__ : Returns the string returned by the HTTP request

## HTTP Request Example:
```
const HTTP = new XMLHttpRequest();
const url = "api-call-url";
HTTP.open("GET", url);
HTTP.send();

HTTP.onreadstatechange = () => {
	if(this.readyState == 4 && this.status == 200){
		// Do whatever with data
	}
}

```

### NOTE: 
- readyState=4 means __download complete__ and status=200 means __DONE__

- Can put the above code snippet ina function which takes 2 inputs :- 
	1. `url` : url for the api call [Good practice to get it from a function]
	2. `callback` : A callback function to pass the response to [We will use it to parse the response to a JSON object]

- Example:
```
// REQUESTING FUNCTION
function callAPI(url, callback) {
	console.log("Calling API");
	var hReq = new XMLHttpRequest();
	hReq.onreadystatechange = () => {
		if(this.readyState == 4 && this.status == 200){
			callback(hReq.responseText);
		}
		hReq.open("GET", url, true); // true for asynchronous
		hReq.send();
	}
}

// CALLBACK FUNCTION
function responseToJSON(response) {
	let jsonObject = JSON.parse(response);
	// parse jsonObject to get the requiered data 
}

```

### Documentation By :-
>Siddharth Gupta

