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
      isOn: false,
      bankSwitch: 'drums',
      volume: 50,
      lastAction: ''
    };
  }

  onVolumeUpdate (event) {
    let text = "Volume : " + event.target.value;
    this.setState({
      volume: event.target.value,
      lastAction: text
    });
  }

  onPowerChange(event) {
    this.setState({
      isOn: !this.state.isOn,
      lastAction: this.state.isOn ? 'OFF' : 'ON'
    });
  }

  onBankChange(event) {
    this.setState({
      bankSwitch: this.state.bankSwitch === 'drums' ? 'piano' : 'drums',
      lastAction: this.state.bankSwitch === 'drums' ? 'Smooth Piano Kit' : 'Heater Kit'
    });
  }

  render() {
    return (
      <div id="drum-machine">
        <PadControls 
          isOn={this.state.isOn}
          volume={this.state.volume}
          currentBank={this.state.bankSwitch}
        />
        <SettingControls 
          isOn = {this.state.isOn}
          display={this.state.lastAction}
          volume={this.state.volume}
          onVolumeUpdate={this.onVolumeUpdate = this.onVolumeUpdate.bind(this)}
          onPowerChange={this.onPowerChange = this.onPowerChange.bind(this)}
          onBankChange= {this.onBankChange = this.onBankChange.bind(this)}
        />
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
      <button className='drum-pad' id={this.props.id}>
        {this.props.keyName}
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
        <Switch 
          name='Power'
          handleChange = {this.props.onPowerChange}
        />
        <Display text={this.props.display}/>
        <VolumeSlide 
          onVolumeUpdate={this.props.onVolumeUpdate}
          volume={this.props.volume}
          isOn={this.props.isOn}
        />
        <Switch 
          name='Bank' 
          handleChange = {this.props.onBankChange}
        />
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
          <input type="checkbox" onChange={this.props.handleChange}/>
          <span class="slider"></span>
        </label>
      </div>
    );
  }
}

class Display extends React.Component {
  render() {
    return(
      <p id="display">{this.props.text}</p>
    );
  }
}

class VolumeSlide extends React.Component {
  render() {
    return(
      <div id="volumeSlide">
        <label for="volume">Volume</label>
        <input type="range" 
              id="volume" 
              name="volume"
              onChange={this.props.onVolumeUpdate}
              value={this.props.volume}
              disabled={this.props.isOn?false:true}
        />
      </div>
    );
  }
}

 
export default App;
