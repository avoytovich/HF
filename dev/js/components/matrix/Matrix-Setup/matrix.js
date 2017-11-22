import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

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

class MatrixComponent extends Component {
  state = {
    value: 'diagnosis'
  };

  componentWillMount() {
    const { path } = this.props.routes.pop();
    this.setState({value: path});
  }

  handleActive = (url, d) => {
    browserHistory.push(`/${this.props.route.path}/${url}`);
    this.setState({value: url});
  };

  render() {
    return (
      <div id="matrix-setup">
        <div className="page-sub-header">Matrix Setup</div>

        <Tabs className="matrix-tabs" value={this.state.value}>
          {TABS.map((item, i) =>
            <Tab  key={i} label={item.label}  value={item.url} className="matrix-tab"/>
          )}}

        </Tabs>

        <div className="content-children">
          {/*{ this.props.children }*/}
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default  connect(mapStateToProps)(MatrixComponent);
