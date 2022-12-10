import { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState()
  console.log(name)
  const url= 'https://restcountries.com/v3.1/name/'+name+'?fullText=true'
  console.log(url)
  useEffect(() => {
      axios
      .get(url)
      .then(country => {
        setCountry(country.data)
      })
      .catch(err =>
          console.log(err))
  },[url])
return country
}

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>
  }
  console.log(country)
  return (
    <div>
      <h3>{country[0].name.common}</h3>
      <div>population {country[0].population}</div> 
      <div>capital {country[0].capital}</div>
      <img src={country[0].flags.png} height='100' alt={`flag of ${country[0].name.common}`}/> 
    </div>
  )  
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
