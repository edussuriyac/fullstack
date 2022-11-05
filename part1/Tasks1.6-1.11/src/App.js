import { useState } from 'react'

const Header = () => {
  return (
      <h1>
        give feedback
      </h1>
    
  )
}

const Statistics = (props) => {
  if(props.good===0 && props.neutral===0 && props.bad===0 ) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  const total = props.good+props.neutral+props.bad
  const avg = (props.good-props.bad)/total
  const percentage = props.good/total *100 +' %'
  return (
    <div>
      <table>
        <tbody>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={total} />
      <StatisticLine text="average" value ={avg} />
      <StatisticLine text="positive" value ={percentage} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
 
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Button = (props) => {
  return (    
      <button onClick={props.handleClick}>{props.feed}</button>    
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header/>
      <Button handleClick={() => setGood(good + 1)} feed='good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} feed='netural'/> 
      <Button handleClick={() => setBad(bad + 1)}feed='bad'/>
      <h2> statistics </h2>
      <Statistics good ={good} neutral = {neutral}
      bad = {bad}/>
    </div>
  )
}

export default App;
