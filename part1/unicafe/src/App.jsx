import React from 'react';
import { useState } from 'react';
import Button from "./Button.jsx";
import Result from "./Result";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleBadclick = () => {
    setBad(bad + 1)
  }
  const handleGoodclick = () => {
    setGood(good + 1)
  }
  const handleNeutralclick = () => {
    setNeutral(neutral + 1)
  }

  const feedback_given = good > 0 || bad > 0 || neutral > 0;


  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGoodclick} text="good" />
      <Button onClick={handleNeutralclick} text="neutral" />
      <Button onClick={handleBadclick} text="bad" />
      <h1>statistics</h1>
      {feedback_given ? (<div><table><tbody>
        <Result button="good" clicks={good} />
        <Result button="neutral" clicks={neutral} />
        <Result button="bad" clicks={bad} />
        <Result button="Total" clicks={bad + neutral + good} />
        <Result button="Avg" clicks={(good - bad) / (good + bad + neutral)} />
        <Result button="Positive" clicks={(good) / (good + bad + neutral)} />
      </tbody> </table> </div>
      ) : (<p>no feedback given</p>)}
    </div>
  )
}

export default App;

