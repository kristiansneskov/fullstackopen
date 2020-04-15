import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Entry = ({name}) => <li>{name}</li>

const Countries = ({countries, filterValue}) => {
    const matches = countries.filter((entry) => entry.name.toLowerCase().includes(filterValue))

    if (matches.length > 10) {
        return (
            <div>
                {`Too many matches, ${matches.length}, specify another filter.`}
            </div>
        )
    }
    if (matches.length === 1) {
        const hit = matches[0]
        return (
            <div>
                <h2>{hit.name}</h2>
                <div>
                    <p>capital {hit.capital}</p>
                    <p>population {hit.population}</p>
                </div>
            </div>
        )
    }

    return (
        <ul>
        {
        matches
        .map((entry) => <Entry key={entry.name} name={entry.name}/>)
        }
        </ul>
    )
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
    setCountrySearchString(event.target.value)
  }

  return (
    <div>
      <h2>Countries</h2>
      <Filter
        value={countrySearchString}
        onChange={handleSearch}
      />

      <Countries countries={countries} filterValue={countrySearchString}/>
      
    </div>
  )
}

export default App

