import "./App.css";
import axios from "axios";
import User from "./user.jpg";
import ai from "./ai.png";
// import arrow from './arrow.png'
import { useRef, useState } from "react";

const YOU = "you";
const AI = "ai";
function App() {
  const inputRef = useRef();
  // const submit = false;
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const [data, setData] = useState([]);

  function refreshPage() {
    window.location.reload(false);
  }

  const handleClick = (event) => {
    event.preventDefault();
    const inputValue = inputRef.current.value;
    setData((prevData) => [...prevData, { from: YOU, value: inputValue }]);
    setIsLoading(true);
    setIsEmpty(false);
    axios
      .post("http://localhost:5000/chat", {
        question: inputValue,
      })
      .then(function (response) {
        setIsLoading(false);
        // console.log(response)
        setData((prevData) => [
          ...prevData,
          { from: AI, value: response.data },
        ]);
      })
      .catch(function (error) {
        alert("OOPS!" + error.message + " try after Sometime");
        refreshPage();
      });

    inputRef.current.value = "";
  };

  const handle = (data) => {
    if (data.from === YOU) {
      return (
        <div className="user">
          <div className="user-info">{data.value}</div>
          <span>
            <img src={User} alt="" />
          </span>
        </div>
      );
    }
    let content = data.value.map(it => {
      if(it.length>0){
        return <ul><li style={{listStyle:"none", textAlign:"left"}}>{it.trim()}</li></ul>
      }
      return null;
    });
    console.log(content)
    return (
      <div className="ai">
        <span>
          <img src={ai} alt="" />
        </span>
        <div className="ai-info">{content}</div>
      </div>
    );
  };
  return (
    <div className="App">
      {isEmpty && <div className="container-empty">
        <h1>Welcome to AIBuddy</h1>
        <p>Ask Your Queries</p>
        </div>}
      {!isEmpty && <div className="container">{data.map(handle)}
      {isLoading && (
          <div className="ai">
            <span>
              <img src={ai} alt="" />
            </span>
            <div className="ai-info">Typing...</div>
          </div>
      )}
 </div>}

      <div className="form-css">
        <div className="form-css">
          <form onSubmit={handleClick}>
            <input
              type="text"
              name="question"
              ref={inputRef}
              autoComplete="off"
              placeholder="Enter your queries"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
