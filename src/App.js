import './App.css';
import React from 'react';

const audios = {
  drums: {
    Q: "Ride",
    W: "Shaker",
    E: "Snare",
    A: "Tom",
    S: "Clap",
    D: "OpenHat",
    Z: "Clave",
    X: "Kick",
    C: "Closed_HH"
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
      mode: 'drums',
      display: 'Lets start'
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
        <div id="display">{this.state.display}</div>
      </div>
    );
  }
}

function Pad(props) {
  return(
    <button>{props.keyName}
      <audio src={"../audio/"+props.id+".wav"} className="clip" id={props.keyName} />
    </button>
  );
}
 
export default App;
