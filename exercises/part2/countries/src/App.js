import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Entry = ({name}) => <li>{name}</li>

const CountryDetail = ({country}) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <div>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <div>
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
const Countries = ({countries, filterValue}) => {
    const matches = countries.filter((entry) => entry.name.toLowerCase().includes(filterValue))

    if (matches.length > 10) {
        return <TooManyHits count={matches.length}/>
    }
    else if (matches.length === 1) {
        const hit = matches[0]
        return <CountryDetail country={hit}/>
    }
    else {
        return <List items={matches} />
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

