import React, {useState} from "react"
import './App.css';

function App() {
  const [cityName, setCityName] = useState("")
  const [weather, setWeather] = useState(null)
  const currentDate = new Date();
  const currentDay = currentDate.toLocaleString('en-US', { weekday: 'long' });

  const [loading, setLoading] = useState(false);



  const handleSubmit = async (e) => {

      e.preventDefault();
      setLoading(true);
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '36402cca04msh9f319384f7fd728p14a212jsn7f77673c2688',
          'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
        }
      };

      
      try {

        if (cityName !== ""){
          const url = `https://api.weatherapi.com/v1/current.json?key=894395e4eff64db7bd8204150232506&q=${cityName}&aqi=no`;
          const response = await fetch(url, options);
          const data = await response.json();
          setWeather(data);

        }else{
          window.alert("Please enter a city name")
        }


      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }




      // setCityName(data);


      // console.log('message', cityName , 'your data: ', data.location.name, 'and weather data: ', weather);
  }
  return (
    <main className="flex min-h-screen items-center justify-around gap-4 p-24">

      <div className="flex flex-col items-center justify-center  bg-opacity-25 backdrop-filter backdrop-blur-lg bg-black p-4 rounded-lg">
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center bg-white p-4 rounded-lg mb-8">
              <input type="text" value={cityName} onChange={(e)=>{setCityName(e.target.value)}} className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500" placeholder="City" />
              <button onClick={handleSubmit} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">Search</button>    
          </form>
        </div>

        
          {weather &&(
            <div className="flex flex-col items-center justify-center">
              <img src={weather.current.condition.icon} alt="Gerard Obomby" className="rounded-full w-40 h-40" />
              <p className="text-4xl font-bold mt-4">{weather.location.name}, {weather.location.country}</p>
              <p className="text-xl mt-2">{weather.current.temp_c} &#176; C</p>
              <p className="text-gray-600 mt-4">{currentDay}, {weather.current.last_updated}</p>
            </div>
          )}

          {loading ? (
            <div className="loader">Loading...</div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                {/* Your existing content */}
              </div>
          )}

      </div>
      
      {weather &&(
        <div className="flex items-center  bg-opacity-25 backdrop-filter backdrop-blur-lg bg-black p-14 rounded-lg">
        <div className='grid grid-cols-3 gap-4'>
          <div className='p-12 bg-white flex flex-col '>
              <h4 className='float-left'>UV Index</h4>
              <p className='text-center'>{weather.current.uv}</p>
          </div>

          <div className='p-12 bg-white flex flex-col '>
              <h4 className='float-left'>Sunrise & Sunset</h4>
              <p className='text-center'>{weather.current.uv}</p>
          </div>

          <div className='p-12 bg-white flex flex-col '>
              <h4 className='float-left'>Wind Status</h4>
              <p className='text-center'>{weather.current.uv}</p>
          </div>

          <div className='p-12 bg-white flex flex-col '>
              <h4 className='float-left'>Visibility</h4>
              <p className='text-center'>{weather.current.vis_km}</p>
          </div>

          <div className='p-12 bg-white flex flex-col '>
              <h4 className='float-left'>Humidity</h4>
              <p className='text-center'>{weather.current.humidity}</p>
          </div>

          <div className='p-12 bg-white flex flex-col '>
              <h4 className='float-left'>Air Quality</h4>
              <p className='text-center'>{weather.current.uv}</p>
          </div>
      </div>
      </div>
      )}
      
    </main>
  );
}

export default App;
