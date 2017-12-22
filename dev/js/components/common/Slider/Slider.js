/* eslint react/no-multi-comp: 0, max-len: 0 */
import 'rc-slider/assets/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Slider, { createSliderWithTooltip } from 'rc-slider';

const style = { width: 600, margin: 50 };

function log(value) {
  console.log(value); //eslint-disable-line
}


function percentFormatter(v) {
  return `${v} %`;
}

const SliderWithTooltip = createSliderWithTooltip(Slider);

class CustomizedSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50,
    };
  }
  onSliderChange = (value) => {
    log(value);
    this.setState({
      value,
    });
  }
  onAfterChange = (value) => {
    console.log(value); //eslint-disable-line
  }
  render() {
    return (
      <Slider value={this.state.value}
              onChange={this.onSliderChange} onAfterChange={this.onAfterChange}
      />
    );
  }
}

export default CustomizedSlider;
