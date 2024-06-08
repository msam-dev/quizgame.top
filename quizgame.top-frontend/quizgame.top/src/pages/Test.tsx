import { useState } from 'react';
import '../assets/css/Test.css';

const Test = () => {
  const [apiResponse, setResponse] = useState([]);

  const callApi = () => {
    fetch('https://localhost:7025/api/test/test-endpoint')
      .then((response) => response.json())
      .then((data) => {
        setResponse(data[0].message);
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