import React, { useState, useEffect } from "react";

import "./App.css";
import WorkspaceButton from "./Components/WorkspaceButton";
import WorkspaceCusWin from "./Components/WorkspaceCusWin";

const ipcRenderer = window.require("electron").ipcRenderer;
const fs = window.require("fs");

function App() {
  const [buttonGroups, setButtonGroups] = useState([[]]);
  const [wrkSpCus, setwrkSpCus] = useState(false);
  const [buttonIndex, setButtonIndex] = useState(-1);
  const [shouldReload, setShouldReload] = useState(false);

  //variable for buttons loaded from json file
  let loadedButtonGroups = [[]];

  useEffect(() => {
    loadButtons();
  }, []);

  useEffect(() => {
    if (buttonGroups[0].length !== 0) {
      saveButtons();
    }
  }, [buttonGroups]);

  useEffect(() => {
    if (shouldReload === true) {
      window.location.reload(true);
    }
  }, [shouldReload]);

  useEffect(() => {
    if (buttonIndex !== -1) {
      const groupIndex = Math.floor(buttonIndex / 3);
      const currentButtonGroups = [...buttonGroups];
      const group = currentButtonGroups[groupIndex];

      if (group) {
        group.splice(buttonIndex, 1);
        console.log("after splice " + currentButtonGroups);
        if (groupIndex === 0 && group.length === 0) {
          saveButtons();
        }
        setButtonGroups(currentButtonGroups);
        setShouldReload(!shouldReload);
      }
    }
  }, [buttonIndex]);

  const addNewButton = (name, color, isLoading) => {
    let updatedButtonGroups;

    isLoading
      ? (updatedButtonGroups = [...loadedButtonGroups])
      : (updatedButtonGroups = [...buttonGroups]);

    const currentGroupIndex = updatedButtonGroups.length - 1;
    const currentGroup = updatedButtonGroups[currentGroupIndex];

    let buttonKey =
      currentGroup.length + 1 + (updatedButtonGroups.length - 1) * 3;

    if (currentGroup.length < 3) {
      const newButton = (
        <button key={buttonKey}>
          <WorkspaceButton
            wrkSpName={name}
            wrkSpColor={color}
            buttonKey={buttonKey}
            onDelete={(index) => {
              setButtonIndex(index);
            }}
          />
        </button>
      );
      updatedButtonGroups[currentGroupIndex] = [...currentGroup, newButton];
    } else {
      const newButton = (
        <button key={buttonKey}>
          <WorkspaceButton
            wrkSpName={name}
            wrkSpColor={color}
            buttonKey={buttonKey}
            onDelete={(index) => {
              setButtonIndex(index);
            }}
          />
        </button>
      );
      updatedButtonGroups.push([newButton]);
    }

    isLoading
      ? (loadedButtonGroups = updatedButtonGroups)
      : setButtonGroups(updatedButtonGroups);
  };

  const saveButtons = () => {
    const buttonData = JSON.stringify(buttonGroups, null, 2);
    fs.writeFile(`./src/WorkspaceData.json`, buttonData, (err) => {
      if (err) {
        console.error("Error saving button groups:", err);
      } else {
        console.log("Button groups saved successfully!");
      }
    });
  };

  const loadButtons = () => {
    fs.readFile(`./src/WorkspaceData.json`, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading button groups:", err);
      } else {
        try {
          const parsedData = JSON.parse(data);
          for (let i = 0; i < parsedData.length; i++) {
            const savedButtonGroup = parsedData[i];
            for (let j = 0; j < savedButtonGroup.length; j++) {
              const {
                props: {
                  children: {
                    props: { wrkSpName, wrkSpColor },
                  },
                },
              } = savedButtonGroup[j];
              addNewButton(wrkSpName, wrkSpColor, true);
            }
          }
          setButtonGroups(loadedButtonGroups);
        } catch (parseError) {
          console.error("Error parsing button groups:", parseError);
        }
      }
    });
  };

  return (
    <div>
      {/*Background Image */}
      <img
        src="C:\VS Code Programs\study_app\src\Images\BackGround2.jpg"
        className=" h-screen w-screen absolute mix-blend-multiply blur-sm opacity-80"
      />
      <div className="flex flex-col h-screen bg-slate-700">
        {/*HEADER */}
        <div className="h-8 relative bg-header-color text-green-text font-raleway text-2xl italic font-light tracking-wider ">
          FlowSpace
        </div>
        <div className="flex flex-1">
          {/*Left section for text */}
          <div
            className="w-1/3 bg-gradient-to-tr from-darker-green from-30% to-dark-green shadow-xl rounded-r-2xl 
            justify-start text-center"
          >
            <p className="text-green-text font-raleway text-3xl italic font-medium tracking-wider leading-10 px-5 py-10">
              WELCOME TO FLOWSPACE
            </p>
            <p className="text-white font-raleway text-xl font-light tracking-tight px-2 pt-5">
              Please select the Workspace you would like to work with today!
            </p>
            <p className="text-white font-raleway text-xl italic font-extralight tracking-tight px-2 pt-8">
              Don't have one?
            </p>
            <p className="text-white font-raleway text-xl font-light tracking-tight px-2 pt-2">
              Use the "+" button and start making a new one!
            </p>
          </div>
          {/*Workspace Display Space*/}
          <div className=" w-2/3 bg-gradient-to-tr from-blue-300 to-green-600 ">
            <div className="flex flex-col max-h-[688px] overflow-y-auto absolute ">
              {buttonGroups.map((group, index) => (
                <div key={index} className="flex">
                  {group}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/*Create Button*/}
        <button
          className="absolute text-2xl  text-center bg-slate-100 rounded-full bottom-7 right-7 h-14 w-14"
          onClick={() => {
            setwrkSpCus(!wrkSpCus);
          }}
        >
          {" "}
          +{" "}
        </button>
      </div>
      {/*Workspace customization window */}
      <div>
        <WorkspaceCusWin
          wrkSpCus={wrkSpCus}
          onCancel={() => setwrkSpCus(!wrkSpCus)}
          onConfirm={(name, color) => {
            addNewButton(name, color, false);
          }}
        />
      </div>
    </div>
  );
}

export default App;
