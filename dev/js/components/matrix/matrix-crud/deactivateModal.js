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
import { deactivateItem,
         getMatrixInfo }      from '../../../actions';


class DeactivateComponent extends Component {

  deactivate = ({list, path, pathReq, domen, activate }) => {
    deactivateItem(domen, pathReq, list, activate)
      .then(() =>
        getMatrixInfo(domen, path, this.props.query, path)
          .then(() => this.props.open(this.props.typeKey, false)))
  };

  transition = (props) => <Slide direction="up" {...props} />;

  render() {
    const { list, deactivateOpen, open, typeKey, itemKey, title, onSubmitTitle } = this.props;
    return  <Dialog
      open={deactivateOpen}
      transition={this.transition}
      keepMounted
      onRequestClose={() => open(typeKey, false)}
    >
      <DialogTitle> { title || 'Deactivate this question ?'} </DialogTitle>

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
          {onSubmitTitle || 'Deactivate'}
        </Button>
      </DialogActions>

    </Dialog>;
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapDispatchToProps)(DeactivateComponent)