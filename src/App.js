import './App.css';
import React from 'react';

const audios = {
  drums: {
    Q: "Heater 1",
    W: "Heater 2",
    E: "Heater 3",
    A: "Heater 4",
    S: "Clap",
    D: "Open HH",
    Z: "Kick n' Hat",
    X: "Kick",
    C: "Closed HH"
  },
  piano: {
    Q: "Chord 1",
    W: "Chord 2",
    E: "Chord 3",
    A: "Shaker",
    S: "Open HH",
    D: "Closed HH",
    Z: "Punchy Kick",
    X: "Side Stick",
    C: "Snare"
  }
};

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      mode: 'drums'
    };
  }
  
  render() {

    const keys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "D"];
    const pads = keys.map(key => 
      <Pad className="drum-pad" id={audios[this.state.mode][key]} keyName={key} />
    );

    return (
      <div id="drum-machine">
        {pads}
        <div id="display"></div>
      </div>
    );
  }
}

function Pad(props) {
  return(
    <button>{props.keyName}</button>
  );
}
 
export default App;
