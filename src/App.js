/* eslint-disable no-useless-constructor */
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
  }
};

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      display: "Affichage"
    };
  }
  render() {
    return (
      <div id="drum-machine">
        <PadControls />
        <SettingControls display={this.state.display}/>
      </div>
    );
  }
}

class PadControls extends React.Component {

  render() {
    const keys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "D"];
    const pads = keys.map(key => 
      <Pad className="drum-pad" 
          id={audios.drums[key]}
          keyName={key} 
      />
    );
    return(
      <div id="padControls">
        {pads}
      </div>
    );
  }
}

class Pad extends React.Component {
  render() {
    return(
      <button>{this.props.keyName}
        <audio src={"../audio/"+this.props.id+".wav"}
              className="clip"
              id={this.props.keyName} 
        />
      </button>
    );
  }
}

class SettingControls extends React.Component {
  render() {
    return(
      <div id="settingControls">
        <Switch name='Power' />
        <Display text={this.props.display}/>
        <VolumeSlide />
        <Switch name='Bank' />
      </div>
    );
  }
}

class Switch extends React.Component {
  render() {
    return(
      <div className="switchContainer">
        <p>{this.props.name}</p>
        <label class="switch">
          <input type="checkbox" />
          <span class="slider"></span>
        </label>
      </div>
    );
  }
}

class Display extends React.Component {
  render() {
    return(
      <p>{this.props.text}</p>
    );
  }
}

class VolumeSlide extends React.Component {
  render() {
    return(
      <div id="volumeSlide">
        <input type="range" 
              id="volume" 
              name="volume"
        />
        <label for="volume">Volume</label>
      </div>
    );
  }
}

 
export default App;
