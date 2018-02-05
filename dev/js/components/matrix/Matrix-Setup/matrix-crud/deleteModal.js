import React, { Component }   from 'react';
import Dialog, {
       DialogActions,
       DialogContent,
       DialogContentText,
       DialogTitle }          from 'material-ui/Dialog';
import Slide                  from 'material-ui/transitions/Slide';
import Button                 from 'material-ui/Button';
import { connect }            from 'react-redux';
import { get }                from 'lodash';
import { bindActionCreators } from 'redux';
import { deleteItem,
         getMatrixInfo }      from '../../../../actions';


class DeleteComponent extends Component {

  deleteIt = ({list, path, pathReq, domen}) => {
    console.log(path)
    deleteItem(domen, pathReq, list)
      .then(() => {
        getMatrixInfo(domen, path, this.props.query, path)
          .then(() => this.props.open(this.props.typeKey, false))
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
      <DialogTitle>{this.props.title} </DialogTitle>

      <DialogContent>
        {list.map((item, index) =>
          <DialogContentText key={index}>
            {index + 1}. {get(item, itemKey)}
          </DialogContentText>)}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => open(typeKey, false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => this.deleteIt(this.props)} color="primary">
          Delete
        </Button>
      </DialogActions>

    </Dialog>;
  }
}

DeleteComponent.defaultProps = {
  title : 'Delete this question?'
}

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapDispatchToProps)(DeleteComponent)