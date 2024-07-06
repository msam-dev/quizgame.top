import { useState } from 'react';
import '../assets/css/Test.css';

/**
 * A proof of concept function to be used as a template for connecting to API endpoints
 * @returns 
 */
const Test = () => {
  
  const url: string = "https://localhost:7025";
  //const url: string = "https://api.quizgame.top";

  const getEndpoint: string = url+"/api/test/get/";
  const postEndpoint: string = url+"/api/test/post/";
  //const asyncPostEndpoint: string = url+"/api/test/asyncPost/";

  const [apiGetResponse, setGetResponse] = useState([]);
  const [apiPostResponse, setPostResponse] = useState([]);
  const [inputBox, setInputBox] = useState(1);

  const callGetApi = () => {
    fetch(getEndpoint)
      .then((response) => response.json())
      .then((data) => {
        setGetResponse(data.message);
      })
      .catch((err) => {
        setGetResponse(err.message);
        console.log(err.message);
      });
  };

  const callPostApi = () => {
    fetch(postEndpoint+inputBox)
      .then((response) => response.json())
      .then((data) => {
        setPostResponse(data.message);
      })
      .catch((err) => {
        setPostResponse(err.message);
        console.log(err.message);
      });
  };

  return (
    <div className='test-page-outer-container'>
      <div className="test-page-title">
        Example of connecting to API endpoints 
      </div>
      <div className='test-page-inner-container'>
        <div className="test-card">
          <div className="test-api-input-container">
            <button className="test-button" onClick={callGetApi}> Call "Get" endpoint </button>   
          </div>
          <div className="test-api-response-container">
            <div className="test-api-response-title">Get endpoint response: </div>
            <div className="test-api-response">{apiGetResponse}</div>
          </div>
        </div>

        <div className="test-card">
          <div className="test-api-input-container">
            <input className="test-text-box" type="number" defaultValue="1" onChange={(e) => setInputBox(+e.target.value)} title='The value to increment the counter by'/>
            <button className="test-button" onClick={callPostApi}> Call "Post" endpoint </button>      
          </div>
          <div className="test-api-response-container">
            <div className="test-api-response-title">Post endpoint response:</div>
            <div className="test-api-response">{apiPostResponse}</div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Test;