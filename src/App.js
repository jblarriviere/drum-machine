/* eslint-disable no-useless-constructor */
import './App.css';
import React from 'react';

const keys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

const audios = {
  drums: [
    {
      key: 'Q',
      id: 'Heater 1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      key: 'W',
      id: 'Heater 2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      key: 'E',
      id: 'Heater 3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      key: 'A',
      id: 'Heater 4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      key: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      key: 'D',
      id: 'Open HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      key: 'Z',
      id: 'Kick n Hat',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      key: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      key: 'C',
      id: 'Closed HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ],
  piano: [
    {
      key: 'Q',
      id: 'Chord 1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
      key: 'W',
      id: 'Chord 2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
      key: 'E',
      id: 'Chord 3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
      key: 'A',
      id: 'Shaker',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
      key: 'S',
      id: 'Open HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
      key: 'D',
      id: 'Closed HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
      key: 'Z',
      id: 'Punchy Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
      key: 'X',
      id: 'Side Stick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
      key: 'C',
      id: 'Snare',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
  ]
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

    this.refsTable = {};
    keys.map(element => {
      return (this.refsTable[element] = React.createRef());
    });


  }

  onVolumeUpdate (event) {
    let text = "Volume : " + event.target.value;
    this.setState({
      volume: event.target.value,
      lastAction: text
    });
  }

  onPowerChange(event) {
    this.setState( (state, props) => ({
      isOn: !state.isOn,
      lastAction: state.isOn ? 'OFF' : 'ON'
    }));
  }

  onBankChange(event) {
    this.setState((state, props) => ({
      bankSwitch: state.bankSwitch === 'drums' ? 'piano' : 'drums',
      lastAction: state.bankSwitch === 'drums' ? 'Smooth Piano Kit' : 'Heater Kit'
    }));

    console.log(this.refsTable);
  }

  onPadClick(event) {
    this.setState({
      lastAction: event.target.id
    });
    this.refsTable[event.target.value].current.volume = this.state.volume / 100;
    this.refsTable[event.target.value].current.play(); 
  }

  render() {
    return (
      
      <div id="drum-machine">
        <PadControls 
          isOn={this.state.isOn}
          currentBank={this.state.bankSwitch}
          onPadClick={this.onPadClick = this.onPadClick.bind(this)}
          refsTable={this.refsTable}
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
    const pads = keys.map(key => 
      <Pad 
        className="drum-pad" 
        key={key}
        keyName={key}
        isOn={this.props.isOn}
        onPadClick={this.props.onPadClick}
        refToQ={this.props.refToQ}
        currentBank={this.props.currentBank}
        refsTable={this.props.refsTable}
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

    let sound = audios[this.props.currentBank].find(element => element.key === this.props.keyName);
    
    return(
      <button 
        className='drum-pad' 
        id={sound.id}
        disabled={!this.props.isOn}
        onClick={this.props.onPadClick}
        value={this.props.keyName}
      >
        {this.props.keyName}
        <audio 
          src= {sound.url}
          className="clip"
          id={this.props.keyName} 
          ref={this.props.refsTable[this.props.keyName]} //to be modified
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
          isOn={this.props.isOn}
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
          isOn= {this.props.isOn}
        />
      </div>
    );
  }
}

class Switch extends React.Component {
  render() {
    let disabled = this.props.name !== 'Power' && !this.props.isOn;  
    return(
      <div className="switchContainer">
        <p>{this.props.name}</p>
        <label className="switch">
          <input 
            type="checkbox" 
            onChange={this.props.handleChange}
            disabled={disabled}
          />
          <span className="slider"></span>
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
        <label htmlFor="volume">Volume</label>
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
