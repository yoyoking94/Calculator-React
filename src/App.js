import './App.css';
import { useState, useEffect } from "react";
import NumberFormat from 'react-number-format';

function App() {

  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  const inputNum = (e) => {
    e.preventDefault();
    if (curState.includes(".") && e.target.innerText === ".") return;

    if (total) {
      setPreState("");
    }

    curState
      ? setCurState((pre) => pre + e.target.innerText)
      : setCurState(e.target.innerText);
    setTotal(false);
  };

  useEffect(() => {
    setInput(curState);
  }, [curState]);

  useEffect(() => {
    setInput("0");
  }, []);

  const operatorType = (e) => {
    e.preventDefault();
    setTotal(false);
    setOperator(e.target.innerText);
    if (curState === "") return;
    if (preState !== "") {
      equals();
    } else {
      setPreState(curState);
      setCurState("");
    }
  };

  const equals = (e) => {
    e.preventDefault();
    if (e?.target.innerText === "=") {
      setTotal(true);
    }
    let cal;
    switch (operator) {
      case "/":
        cal = String(parseFloat(preState) / parseFloat(curState));
        break;

      case "+":
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "X":
        cal = String(parseFloat(preState) * parseFloat(curState));
        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(curState));
        break;
      default:
        return;
    }
    setInput("");
    setPreState(cal);
    setCurState("");
  };

  const minusPlus = (e) => {
    e.preventDefault();
    if (curState.charAt(0) === "-") {
      setCurState(curState.substring(1));
    } else {
      setCurState("-" + curState);
    }
  };

  const percent = (e) => {
    e.preventDefault();
    preState
      ? setCurState(String((parseFloat(curState) / 100) * preState))
      : setCurState(String(parseFloat(curState) / 100));
  };

  const reset = (e) => {
    e.preventDefault();
    setPreState("");
    setCurState("");
    setInput("0");
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-display">
        {input !== "" || input === "0" ? (
          <NumberFormat
            value={input}
            displayType={"text"}
            thousandSeparator={true}
          />
        ) : (
          <NumberFormat
            value={preState}
            displayType={"text"}
            thousandSeparator={true}
          />
        )}
      </div>

      <div className="calc-keys">

        <div className="topbar">
          <button className="clear" onClick={reset}>AC</button>
          <button className="negative" onClick={minusPlus}>+/-</button>
          <button className='percent' onClick={percent}>%</button>
        </div>

        <div className="numeric">
          <button onClick={inputNum} className="seven">7</button>
          <button onClick={inputNum} className="eight">8</button>
          <button onClick={inputNum} className="nine">9</button>
          <button onClick={inputNum} className="four">4</button>
          <button onClick={inputNum} className="five">5</button>
          <button onClick={inputNum} className="six">6</button>
          <button onClick={inputNum} className="one">1</button>
          <button onClick={inputNum} className="two">2</button>
          <button onClick={inputNum} className="three">3</button>
          <button onClick={inputNum} className="zero">0</button>
          <button onClick={inputNum} className="decimal">.</button>
        </div>

        <div className="sidebar">
          <button value="/" className="divide operator" onClick={operatorType}>/</button>
          <button value="*" className="multiply operator" onClick={operatorType}>X</button>
          <button value="-" className="subtract operator" onClick={operatorType}>-</button>
          <button value="+" className="add operator" onClick={operatorType}>+</button>
          <button value="=" className="equals" onClick={equals}>=</button>
        </div>

      </div>
    </div>
  );
}

export default App;
