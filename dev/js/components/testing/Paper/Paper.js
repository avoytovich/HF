import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import PaperSheet from 'material-ui/Paper';
import capitalize from 'lodash/capitalize';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

class Paper extends Component {
  render() {
    const {
      classes,
      step,
      conditionText,
      label,
    } = this.props;
    return (
      <PaperSheet className={classes.root} elevation={4}>
        {/*<h5>Step #{ step }</h5>*/}
        <h5>{ capitalize(label) }</h5>
        <div style={{ fontWeight: 'lighter' }}>{ conditionText ? conditionText : '-' }</div>
      </PaperSheet>
    );
  }
}

Paper.defaultProps = {
  label: 'Condition',
};

Paper.propTypes = {
  classes: PropTypes.object.isRequired,
  step: PropTypes.number,
  conditionText: PropTypes.string,
};

export default withStyles(styles)(Paper);