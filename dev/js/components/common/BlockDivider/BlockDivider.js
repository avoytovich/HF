import React, {Component} from 'react';
import KeyboardArrowLeft  from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'

const STYLES = {
  width: '35px', height: '35px'
};

class BlockDivider extends Component{
  state = { reSize: '' };

  changeClass = (size) => this.setState({reSize: !size ? 're_size' : ''});

  render() {
    const { children, title } = this.props;
    const { reSize } = this.state;
    return <div className={`block_divider ${reSize}` }>
      {
        children.map((child, i) => {
          if (i === 0) {
            return (
              <div className="left"  key={i}>
                <KeyboardArrowLeft
                  className="arrow-left"
                  style={{...STYLES}}
                  onClick={() => this.changeClass(reSize)}
                />
                <KeyboardArrowRight
                  className="arrow-right"
                  style={{...STYLES}}
                  onClick={() => this.changeClass(reSize)}/>

                <div className="vertical_title">
                  {title}
                </div>
                <div className="left_block">
                  {child}
                </div>
              </div>
            )
          }
          else {
            return (
              <div className="right" key={i}>
                {child}
              </div>
            );
          }
        })
      }
    </div>
  }
};

export default BlockDivider;