import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class Main extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div className="main-content">
            { this.props.children }
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default  connect(mapStateToProps)(Main);
