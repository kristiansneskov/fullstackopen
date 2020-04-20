import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Entry = ({name }) => <li>{name}</li>

const WeatherInfo = ({country}) => {
    const [ temperature, setTemperature] = useState('retrieving...') 
    const [ icon, setIcon] = useState('') 
    const [windSpeed, setWindSpeed] = useState('')
    const api_key = process.env.REACT_APP_API_KEY
    axios.defaults.timeout = 60000
    const hook = () => {
        const query = 'http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + country.capital
        console.log(query)
        axios
          .get(query)
          .then(response => {
            console.log(response.data)
            if (response.data.success === false) {
                setTemperature('Unknown')
            }
            else {
                console.log(response.data.current.temperature)
                setTemperature(response.data.current.temperature)
                setWindSpeed(response.data.current.wind_speed)
                if (response.data.current.weather_icons.length > 0) {
                    setIcon(response.data.current.weather_icons[0])
                }
            }
          })
      }
    useEffect(hook, [])
    return (
        <div>
            <h3>Weather in {country.capital}</h3>
            <div>
                <p><b>Temperature</b> {temperature} Celcius </p>
                <img src={icon} alt='weather' />
                <p><b>Wind</b> {windSpeed} m/s </p>
            </div>
        </div>
    )
}

const CountryDetail = ({country}) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <div>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <div>
                    <h3>Spoken languages</h3>
                    <List items={country.languages}/>
                </div>
                <div>
                    <img src={country.flag} alt="flag"/>
                </div>
            </div>
            
        </div>
    )
}

const TooManyHits = ({count}) => (
    <div>
        {`Too many matches: ${count}, specify another filter.`}
    </div>
)

const ExpandableList = ({items, onExpansion}) => {
    return (
        <ul>
        {
            items
            .map((entry) => {
                return (
                    <li key={entry.name}> 
                        {entry.name} 
                        <button onClick={onExpansion} value={entry.name.toLowerCase()}> show</button>
                    </li>
                )
            })
        }
        </ul>
    )
}

const List = ({items}) => {
        return (
            <ul>
            {
                items
                .map((entry) => <Entry key={entry.name} name={entry.name}/>  )
            }
            </ul>
        )
}
const Countries = ({countries, filterValue, handleSingleSelection}) => {

    const matches = countries.filter((entry) => entry.name.toLowerCase().includes(filterValue))
    
    console.log(matches)
    if (matches.length > 10) {
        return <TooManyHits count={countries.length}/>
    }
    else if (matches.length === 1) {
        const hit = matches[0]
        return (
            <div>
                <CountryDetail country={hit}/>
                <WeatherInfo country={hit}/>
            </div>
            
        )
    }
    else {
        return <ExpandableList items={matches} onExpansion={handleSingleSelection}/>
    }
}

const Filter = ({value, onChange}) => (
  <div>
  find countries <input value={value} onChange={onChange}/> 
  </div>
)

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ countrySearchString, setCountrySearchString] = useState('') 

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])


  const handleSearch = (event) => {
    console.log(event.target.value)
    setCountrySearchString(event.target.value)
    
  }

  const api_key = process.env.REACT_APP_API_KEY
  console.log(api_key)

  return (
    <div>
      <h2>Countries</h2>
      <Filter
        value={countrySearchString}
        onChange={handleSearch}
      />

      <Countries countries={countries} filterValue={countrySearchString} handleSingleSelection={handleSearch}/>
      
    </div>
  )
}

export default App

