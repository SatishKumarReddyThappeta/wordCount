import React, { useEffect, useState } from "react";

function WordConnect() {
  let data = [
    [
      { word: "Eraser", idx: 0 },
      { word: "Orange", idx: 0 },
      { word: "Monday", idx: 0 },
      { word: "Apple", idx: 0 },
    ],
    [
      { word: "Black", idx: 1 },
      { word: "Car", idx: 1 },
      { word: "Navy Blue", idx: 1 },
      { word: "Guitar", idx: 1 },
    ],
    [
      { word: "Hand", idx: 2 },
      { word: "Ruler", idx: 2 },
      { word: "Earth", idx: 2 },
      { word: "Scarf", idx: 2 },
    ],
    [
      { word: "Nutmeg", idx: 3 },
      { word: "Boots", idx: 3 },
      { word: "Glue", idx: 3 },
      { word: "Snow", idx: 3 },
    ],
    [
      { word: "Ginger", idx: 4 },
      { word: "Eye", idx: 4 },
      { word: "Mars", idx: 4 },
      { word: "Piano", idx: 4 },
    ],
    [
      { word: "Sunday", idx: 5 },
      { word: "Banana", idx: 5 },
      { word: "Venus", idx: 5 },
      { word: "Ear", idx: 5 },
    ],
    [
      { word: "Rain", idx: 6 },
      { word: "Drums", idx: 6 },
      { word: "Grey", idx: 6 },
      { word: "Wind", idx: 6 },
    ],
    [
      { word: "Hat", idx: 7 },
      { word: "Grape", idx: 7 },
      { word: "Notebook", idx: 7 },
      { word: "Train", idx: 7 },
    ],
    [
      { word: "Gloves", idx: 8 },
      { word: "Violin", idx: 8 },
      { word: "Cinnamon", idx: 8 },
      { word: "Allspice", idx: 8 },
    ],
    [
      { word: "Sun", idx: 9 },
      { word: "Foot", idx: 9 },
      { word: "Friday", idx: 9 },
      { word: "Mercury", idx: 9 },
    ],
    [
      { word: "Bus", idx: 10 },
      { word: "Scissors", idx: 10 },
      { word: "Pencil", idx: 10 },
      { word: "Airplane", idx: 10 },
    ],
    [
      { word: "Calculator", idx: 11 },
      { word: "Pen", idx: 11 },
      { word: "White", idx: 11 },
      { word: "Tuesday", idx: 11 },
    ],
  ];
  const [showConfig, setShowConfig] = useState(false);
  const [groupSize, setGroupSize] = useState(2);
  const [itemCount, setItemsCount] = useState(8);
  const [columns, setColumns] = useState(4);
  const [wordData, setWordData] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedIndexs, setSelectedIndexs] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [attempts, setAttempts] = useState(0);
  
  const changeData = () => {
    let newData = [];
    for (let i = 0; i < itemCount; i++) {
      let group = data[i];
      for (let j = 0; j < groupSize; j++) {
        newData.push(group[j]);
      }
    }
    console.log(newData, "beforeSort");
    newData.sort(() => Math.random() - 0.5);
    setWordData(newData);
  };

  useEffect(() => {
    changeData();
  }, [groupSize, itemCount]);

  useEffect(() => {
    if (userAnswers.length === groupSize) {
      let idx = userAnswers[0].idx;
      let flag = userAnswers.every((word) => word.idx === idx);
      if (flag) {
        let newData = wordData.filter((word) => word.idx !== idx);
        setTimeout(() => {
          setWordData(newData);
          setSelectedIndexs([]);
        }, 800);
      } else {
        setWrongAnswers([...selectedIndexs]);
        setTimeout(() => {
          setWrongAnswers([]);
        }, 1000);
        setSelectedIndexs([]);
      }
      setUserAnswers([]);
      setAttempts((prev) => prev + 1);
    }
  }, [userAnswers]);
  return (
    <div className="relative flex flex-col items-center gap-10 justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="text-2xl">Word Connect</div>
        <div>
          Connect group of {groupSize} words by clicking on related words
        </div>
      </div>
      <div className="w-[100%] flex justify-center items-end flex-col">
        <div
          className="flex  w-1/6 justify-between bg-gray-700 text-white p-2 rounded-md cursor-pointer"
          onClick={() => {
            setShowConfig((prev) => !prev);
          }}
        >
          <div className="text-xl">{showConfig ? "-" : "+"}</div>
          <div>Config</div>
          <div></div>
        </div>
        {showConfig && (
          <div className="p-4 rounded-lg w-1/6 bg-gray-900 text-white flex flex-col gap-2 fixed top-[190px]">
            <div className="flex justify-between ">
              <div>GroupSize</div>
              <input
                type="range"
                min={2}
                max={4}
                value={groupSize}
                onChange={(e) => {
                  setGroupSize(parseInt(e.target.value));
                }}
              />
              <div>{groupSize}</div>
            </div>
            <div className="flex justify-between ">
              <div>itemCount</div>
              <input
                type="range"
                min={4}
                max={12}
                value={itemCount}
                onChange={(e) => {
                  setItemsCount(parseInt(e.target.value));
                }}
              />
              <div>{itemCount}</div>
            </div>
            <div className="flex justify-between ">
              <div>columns</div>
              <input
                type="range"
                min={2}
                max={4}
                value={columns}
                onChange={(e) => {
                  setColumns(parseInt(e.target.value));
                }}
              />
              <div>{columns}</div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row flex-wrap gap-10 w-5/6">
        {wordData.map((word, idx) => {
          return (
            <div
              key={(word, idx)}
              className={`border ${
                columns === 4
                  ? "w-[300px]"
                  : columns === 3
                  ? "w-[400px]"
                  : "w-[500px]"
              } border-gray-800 flex justify-center items-center p-2 rounded-lg ${
                wrongAnswers.includes(idx)
                  ? "bg-red-400 cursor-not-allowed"
                  : "cursor-pointer"
              }  ${selectedIndexs.includes(idx) ? "bg-blue-400" : ""}`}
              onClick={() => {
                setUserAnswers((prev) => {
                  return [...prev, word];
                });
                setSelectedIndexs((prev) => {
                  return [...prev, idx];
                });
              }}
            >
              {word.word}
            </div>
          );
        })}
      </div>
      <div>Attempts:{attempts}</div>
      <button
        className="w-16 h-8 bg-gray-400 rounded-md"
        onClick={() => {
          changeData();
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default WordConnect;