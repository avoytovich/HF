import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import AppBar from 'material-ui/AppBar';
import { withStyles } from 'material-ui/styles';

// UI
import Tabs, { Tab } from 'material-ui/Tabs';

const TABS = [
  { label: 'Diagnostic',     url: 'assets-diagnostics' },
  { label: 'Exercises',     url: 'assets-exercises' }
];

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
});


class AssetsComponent extends Component {
  state = {
    value: 0
  };

  componentWillMount() {
    const { path } = this.props.routes.pop();
    this.findNewPathIndex(TABS, path);
  }

  findNewPathIndex = (tabs, path) => {
    const newURL = tabs.reduce((result, item, index) => {
      if (item) return  item.url === path ? index : result;

      return result;
    }, 0);
    this.setState({value: newURL});
  };

  handleActive = (url) => {
    browserHistory.push(`${this.props.route.path}/${url}`);
    this.findNewPathIndex(TABS, url);
  };


  handleChange = (event, value) => {
    this.setState({ value });
    console.log(value)
  };

  render() {
    return (
      <div id="matrix-setup">
          <AppBar position="static" color="default">
            <Tabs
              scrollable
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              {TABS.map((item, i) =>
                <Tab  key={i}
                      label={item.label}
                      onClick={() => this.handleActive(item.url)}/>)}
            </Tabs>
          </AppBar>
        <div className="content-children">
            { this.props.children }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default  connect(mapStateToProps)(AssetsComponent);