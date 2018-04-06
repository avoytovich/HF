import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import AppBar from 'material-ui/AppBar';
import { withStyles } from 'material-ui/styles';

// UI
import Tabs, { Tab } from 'material-ui/Tabs';

const TABS = [
  { label: 'Diagnosis',  url: 'diagnosis'   },
  { label: 'Conditions', url: 'conditions'  },
  { label: 'Treatments', url: 'treatments'  },
  { label: 'Packages',   url: 'packages'    },
  { label: 'Exercises',  url: 'exercises'   },
  { label: 'Level Up',   url: 'levelUps'    },
  { label: 'Evaluation', url: 'evaluations' },
  { label: 'Pain zones', url: 'body-area'   }
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
    const index = this.findNewPathIndex(TABS, path);
    this.setState({value: index});
  }

  findNewPathIndex = (tabs, path) => tabs.reduce((result, item, index) => {
      if (item) return  item.url === path ? index : result;

      return result;
    }, 0);

  handleActive = (url) => {
    const newURL = this.findNewPathIndex(TABS, url);
    if (this.state.value !== newURL){
      this.setState({value: newURL});
      browserHistory.push(`${this.props.route.path}/${url}`);
    }
  };


  handleChange = (event, value) => this.setState({ value });

  correctShowing = ({pathname}) => pathname.indexOf('create') === -1;

  render() {
    const showNav = this.correctShowing(this.props.location);
    return (
      <div id="matrix-setup">

        {showNav && <AppBar position="static" color="default">
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
          </AppBar>}

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

export default  connect(mapStateToProps)(MatrixComponent);