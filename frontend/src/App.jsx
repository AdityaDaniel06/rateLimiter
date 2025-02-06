import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [requestNumber, setRequestNumber] = useState(1);
  const [userData, setUserData] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [isAutomated, setIsAutomated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (input) => {
    setRequestNumber(Number(input.target.value));
    // console.log(input.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!requestNumber || requestNumber <= 0) {
      alert("Number of requests should be at least 1");
      return;
    }
    setCount(0); // Reset count before sending new requests

    fetchUserData();
  };

  // Function to make API requests
  const fetchUserData = async () => {
    let response;
    try {
      let responses = [];
      let statuses = [];
      for (let i = 1; i <= requestNumber; i++) {
        response = await axios.get("http://127.0.0.1:8000/api/v1/user-data");
        // console.log(`Response No ${i}:`, response);

        responses.push(response.data);
        statuses.push(response.status);

        setCount((prev) => prev + 1);
        // Store the request count in session storage for persistence
        sessionStorage.setItem("requestCount", count);
        // const requestCount = parseInt(sessionStorage.getItem("requestCount"));
      }
      setUserData(responses);
      setStatusList(statuses);
    } catch (err) {
      console.error("Error sending requests", err);
      // setStatusList(response.status);
      // console.log("status", statusList);
      if (err.response && err.response.status === 429) {
        setErrorMessage(
          "Too many requests! Please wait 15 minutes before trying again."
        );
      } else {
        setErrorMessage("An error occurred while fetching data.");
      }

      setCount(0);
      setUserData([]);
      setStatusList([]);
      alert("Too many requests sent , please try again after 15 mins");
    }
  };

  useEffect(() => {
    if (isAutomated) {
      setCount(0);
      setErrorMessage("");
      fetchUserData();
      setIsAutomated(false);
    }
  }, [isAutomated]);

  const automateRequest = () => {
    if (!isAutomated) {
      setIsAutomated(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter Number of Requests:</label>
        <input
          type="number"
          name="requestNumber"
          value={requestNumber}
          onChange={handleInput}
        />
        <button type="submit">Send Requests</button>
      </form>

      <div>
        <p>
          Total Requests Sent: <span>{count}</span>
        </p>
      </div>

      <button type="button" onClick={automateRequest} disabled={isAutomated}>
        {isAutomated ? "Automated Running..." : "Automate Request"}
      </button>

      {errorMessage && (
        <div style={{ color: "red", marginTop: "10px", fontWeight: "bold" }}>
          {errorMessage}
        </div>
      )}

      <div>
        <h3>Status Codes:</h3>
        <ul>
          {statusList?.map((status, index) => (
            <li key={index}>
              {index + 1} : Request status : {status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
