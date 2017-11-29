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
import { deleteItem }         from '../../../../actions';


class DeleteComponent extends Component {

  deactivate = ({list, path, domen}) => {
    deleteItem(domen, path, list)
      .then(() => {
        this.props.open(this.props.typeKey, false);
      })
  };

  transition = (props) => <Slide direction="up" {...props} />;

  render() {
    const { list, deactivateOpen, open, typeKey, itemKey } = this.props;

    return  <Dialog
      open={deactivateOpen}
      transition={this.transition}
      keepMounted
      onRequestClose={() => open(key, false)}
    >
      <DialogTitle> Delete this question ? </DialogTitle>

      <DialogContent>
        {list.map((item, index) =>
          <DialogContentText key={index}>
            {index + 1}. {item[itemKey]}
          </DialogContentText>)}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => open(typeKey, false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => this.deactivate(this.props)} color="primary">
          Delete
        </Button>
      </DialogActions>

    </Dialog>;
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapDispatchToProps)(DeleteComponent)