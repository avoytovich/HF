import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'


// UI
import Subheader from 'material-ui/Subheader';
import {Tabs, Tab} from 'material-ui/Tabs';

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

class MatrixComponent extends Component {
  state = {
    value: 'diagnosis'
  };

  componentDidMount() {
    const { path } = this.props.routes.pop();
    this.setState({value: path});
  }

  handleActive = (url) => {
    browserHistory.push(`/${this.props.route.path}/${url}`);
    this.setState({value: url});
  };

  render() {
    return (
      <div>
        <Subheader className="page-sub-header">Matrix Setup</Subheader>

        <Tabs className="matrix-tabs" value={this.state.value}>
          {TABS.map((item, i) =>
            <Tab  key={i}
                  value={item.url}
                  label={item.label}
                  onActive={() => this.handleActive(item.url) }/>
          )}}

        </Tabs>

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
