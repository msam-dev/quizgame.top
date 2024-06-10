import { useState } from 'react';
import '../assets/css/Test.css';


//const apiName: string = "https://api.quizgame.top/api/test/test-endpoint";
  const apiName: string = "https://localhost:7025/api/test/test-endpoint";

const Test = () => {
  const [apiResponse, setResponse] = useState([]);
  
  const callApi = () => {
    fetch(apiName)
      .then((response) => response.json())
      .then((data) => {
        setResponse(data.message);
        console.log(data);
      })
      .catch((err) => {
          console.log(err.message);
      });
  };

  return (
    <>
      <div className="test-card">
        <button className="test-button" onClick={callApi}> Call API </button>
        <div>&nbsp;{apiResponse}</div>
      </div>
    </>
  );
}

export default Test;