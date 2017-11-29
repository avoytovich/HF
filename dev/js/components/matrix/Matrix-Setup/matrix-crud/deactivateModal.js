import React, { Component }   from 'react';
import Dialog, {
       DialogActions,
       DialogContent,
       DialogContentText,
       DialogTitle }          from 'material-ui/Dialog';
import Slide                  from 'material-ui/transitions/Slide';
import Button                 from 'material-ui/Button';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { deactivateItem }      from '../../../../actions';


class DeactivateComponent extends Component {

  deactivate = ({list, path, domen}) => {
    deactivateItem(domen, path, list)
      .then(el => {
        this.props.open('deactivateOpen', false);
      })
  };

  transition = (props) => <Slide direction="up" {...props} />;

  render() {
    const { list, deactivateOpen, open } = this.props;

    return  <Dialog
      open={deactivateOpen}
      transition={this.transition}
      keepMounted
      onRequestClose={() => open('deactivateOpen', false)}
    >
      <DialogTitle> Deactivate this question ? </DialogTitle>

      <DialogContent>
        {list.map((item, index) =>
          <DialogContentText key={index}>
            item.id
          </DialogContentText>)}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => open('deactivateOpen', false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => this.deactivate(this.props)} color="primary">
          Deactivate
        </Button>
      </DialogActions>

    </Dialog>;
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapDispatchToProps)(DeactivateComponent)