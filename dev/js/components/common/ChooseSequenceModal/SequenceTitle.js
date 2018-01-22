import React, { Component }  from 'react';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
}                            from 'material-ui/Dialog';
import Input                 from 'material-ui/Input';
import { FormControl }       from 'material-ui/Form';
import Button                from 'material-ui/Button';
import Slide                 from 'material-ui/transitions/Slide';
import {
  changeSequenceTitle
}                            from '../../../actions';
import PropTypes             from 'prop-types';


class SequenceTitle extends Component {
  state = { value: '' };

  componentDidMount() {
    const { title } = this.props.item;
    this.setState({value: title});
  }

  handleChange = (event) => this.setState({value: event.target.value});

  save = (item, value) => {
    if (value.length < 2) return;

    const { step } = item;
    changeSequenceTitle('diagnostics', 'changeSequenceTitle', step, {title: value})
      .then(res => this.props.update());
  };

  TransitionDouble = (props) => <Slide direction="up" {...props} />;

  render() {
    const { value } = this.state;
    const { item, onClose } = this.props;

    return <Dialog
      open={true}
      onRequestClose={onClose}
      transition={this.TransitionDouble}
      onClick={event => event.stopPropagation()}
    >
      <DialogTitle>
        Edit Title
      </DialogTitle>

      <DialogContent>
        <FormControl>
          <Input value={value}
                 onChange={this.handleChange} />
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}
                color="primary">
          Cancel
        </Button>
        <Button onClick={() => this.save(item, value)} color="primary" autoFocus>
          Save
        </Button>
      </DialogActions>

    </Dialog>
  }
}

SequenceTitle.propTypes = {
  onClose   : PropTypes.func.isRequired,
  item      : PropTypes.shape({
      step  : PropTypes.number.isRequired,
      title : PropTypes.string.isRequired,
    }).isRequired
};

export default SequenceTitle;