import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY 

const Filter = ({searchString,handleSearchStringChange}) => {
  return (
    <div>
      find countries <input value={searchString} onChange={handleSearchStringChange}/>
    </div>
  )
}

const CountryName = ({country}) => {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      {country.name.common}
      <button onClick={() => setVisible(true)}>
        show
       </button>
       {visible && <CountryShowing country={country} />}
    </div>
  )
}

const CountryShowing = ({country}) => {

  return (
    <div>
      <h2>{country.name.common}</h2>
      capital {country.capital[0]}
      <br/>
      area {country.area}
      <h3> languages</h3>
      
      {Object.values(country.languages).map((lang) => 
        <li key={lang}>{lang}</li>)}
      <img src={country.flags.png} alt='flag' />
      <Weather city={country.capital[0]}/>
      <br/>
    </div>
  )
}

const Countries = ({searchString, countriesToShow}) => {
  console.log(countriesToShow)
  if (searchString==='') {
    return (
      <div>
        
      </div>
    )
  }
  if (countriesToShow.length>10) {
    return (
      <div>
      'Too many matches, specify another filter' 
      </div>
    )
  } 

  return (
    <div>
      {countriesToShow.map(country=>
        <CountryName key={country.tld[0]} country = {country}/>)}
   
    </div>
  )
}
//**************************************remember to remove api key */
const Weather = ({city}) => {
  const [weather, setWeather] = useState([])
  const url='https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+api_key
  const hook = () => {
    axios
      .get(url)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
  }
  useEffect(hook, [url])
  
  if (weather.length!==0){
  const icon = weather.weather[0].icon
  // const icon = '10d'
  const url_icon = 'http://openweathermap.org/img/wn/'+icon+'@2x.png'
  return (
    <div>
      <h2> Weather in {city}</h2>
      <p>temperature {weather.main.temp} celcius</p>
      <img src={url_icon} alt='weather'/>
      <p>wind {weather.wind.speed} m/s </p>
    
    </div>
  )
  } else {
    return(
      <div>

      </div>
    )
  }

}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchString, setSearchString] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])

  const handleSearchStringChange = (event) => {   
    setSearchString(event.target.value)
  }

  const countriesToShow = countries.filter(country=> country.name.common.toLowerCase().includes(searchString))
  

  return (
    <div>
      <Filter searchString={searchString} handleSearchStringChange={handleSearchStringChange}/>
      <Countries searchString={searchString} countriesToShow={countriesToShow}/>
    
    </div>
  )

}


export default App

