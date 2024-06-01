import { useState } from 'react'
import './App.css'


function increment(count: number): number{
  //setCount(count+1);
  return count+1;
}


function App() {
const [count, setCount] = useState(0);
const [apiCall, setApi] = useState("default");


function getApiCall(): string {
  let data:string = "";
  //data = fetch('https://api.quizgame.top/api/test/test-endpoint', { method: 'GET' })
  return data;
}
  return (
    <>
      <div className="card">
        <button onClick={() => setCount(increment(count))}>
         count {count}
        </button>
      </div>

      <div className="card">
        <button onClick={getApiCall}>
          {/* Click to Test Api: {apiCall} */}
        </button> 
      </div>
    </>
  )
}

export default App;
