import React, { useState, useEffect } from "react";
import './Style.css'



const keySequence = ["a", "s", "d", "f", "j", "k", "l", ";"];





const TypingBox = () => {
  const [nextKey, setNextKey] = useState(keySequence[0]);
  const [input, setInput] = useState("");
  const [keyCount, setKeyCount] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [startPractice, setStartPractice] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [incorrectSound, setIncorrectSound] = useState(new Audio());

  useEffect(() => {
    setIncorrectSound(new Audio("ting.mp3"));
  }, []);
  
 





 // const handleKeyDown = (event) => {
   // if (event.key !== nextKey) {
     // incorrectSound.play();
   // }
  //}
  

 // document.addEventListener('keydown', handleKeyDown);
  useEffect(() => {
    if (startPractice) {
      const interval = setInterval(() => {
        setTimeElapsed(timeElapsed + 1);
        if (input === nextKey) {
          setKeyCount(keyCount + 1);
          setInput("");
          setNextKey(keySequence[keyCount % 8]);
        }else if (input !== nextKey && input.length > 0) {
          incorrectSound.play();
        }

      }, 500);
      return () => clearInterval(interval);
    }
  }, [input, nextKey, keyCount, startPractice, timeElapsed,incorrectSound]);

  useEffect(() => {
    setAccuracy((keyCount / (keyCount + (input.length - 1))) * 100);
  }, [keyCount, input]);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    if (startPractice && timeElapsed === 300) {
      console.log("Time's up!");
      console.log(`Number of keys pressed: ${keyCount}`);
      console.log(`Accuracy: ${accuracy.toFixed(2)}%`);
      setStartPractice(false);
    }
  }, [startPractice, timeElapsed, keyCount, accuracy]);

  const startTimer = () => {
    setStartPractice(true);
  };

  return (
   <div>
  <div className="TypingBox">
  <div className="TypingScript">
  <p> Typing Script</p>
</div>


      {!startPractice && (
        <button onClick={startTimer}>Start Practice</button>
      )}
      {startPractice && (
    <>
      <input type="text" value={input} onChange={handleChange} />
      <div style={{ display: "inline-block",fontSize:"30px",content:"flex",color:"white " }}>Next Key: {nextKey}</div>
    </>
  )}
      {!startPractice && timeElapsed > 0 && (
        <div>
          <div>Keys Typed: {keyCount}</div>
          <div>Accuracy: {accuracy.toFixed(2)}%</div>
        </div>
      )}
    </div>
    </div>
  );
};

export default TypingBox;