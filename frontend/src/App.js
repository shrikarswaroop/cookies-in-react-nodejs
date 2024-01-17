import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState('');
  const [displayMessage, setDisplayMessage] = useState();
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    let getContent = async () => {
      const response = await axios.get(
        'http://localhost:8080/content', {
        withCredentials: true,
      })
      setDisplayMessage(response.data[1]);
      setShowInput(response.data[0]);
    }
    getContent();
  }, []);

  const sendName = async () => {
    console.log('Submitting...');
    let response = await axios.post(
      'http://localhost:8080/name', {}, {
      params: { name }
    })
    response = await axios.get(
      `http://localhost:8080/cookie?loc=${response.data}`, {
      withCredentials: true,
    })
    if(response.data) {
      setDisplayMessage("You can close this window, and I'll still remember you for a minute!!");
      setShowInput(false);
    }
  }

  return (
    <div>
      <h1>{displayMessage}</h1>
      {showInput === true &&
        <>
          <input type="text" id="name-input" onChange={(e) => {
            setName(e.target.value);
          }} />
          <button id="send-button" onClick={sendName}>Submit</button>
        </>
      }
    </div>
  );
}

export default App;
