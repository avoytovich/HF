import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import AppBar from 'material-ui/AppBar';
import { withStyles } from 'material-ui/styles';

// UI
import Tabs, { Tab } from 'material-ui/Tabs';

const TABS = [
  { label: 'Diagnosis',     url: 'diagnosis' },
  { label: 'Conditions',    url: 'conditions' },
  { label: 'Treatments',    url: 'treatments' },
  { label: 'Packages',      url: 'packages' },
  { label: 'Evaluation',    url: 'evaluation' },
  { label: 'Meta Controls', url: 'meta-controls' },
  { label: 'Achievements',  url: 'achievements' },
  { label: 'Exercises',     url: 'exercises' },
  { label: 'Tests',         url: 'tests' },
];

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
});


class MatrixComponent extends Component {
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
    browserHistory.push(`/${this.props.route.path}/${url}`);
    this.findNewPathIndex(tabs, url);
  };


  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {

    return (
      <div id="matrix-setup">
        <div className="page-sub-header">Matrix Setup</div>

          <AppBar position="static" color="default">
            <Tabs scrollable scrollButtons="off"
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

      </div>
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default  connect(mapStateToProps)(MatrixComponent);

{/*<div className={styles.root}>*/}

{/*<Tabs scrollable scrollButtons="off" value={this.state.value}>*/}
{/*

{/*<div className="content-children">*/}
{/*/!*{ this.props.children }*!/*/}
{/*</div>*/}
{/*</div>*/}