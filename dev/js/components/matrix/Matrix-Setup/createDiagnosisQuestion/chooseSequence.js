import React, { Component }             from 'react';
import { connect }                      from 'react-redux';
import { bindActionCreators }           from 'redux';
import Dialog                           from 'material-ui/Dialog';
import Slide                            from 'material-ui/transitions/Slide';
import List, { ListItem, ListItemText } from 'material-ui/List';
import AppBar                           from 'material-ui/AppBar';
import Toolbar                          from 'material-ui/Toolbar';
import IconButton                       from 'material-ui/IconButton';
import Typography                       from 'material-ui/Typography';
import CloseIcon                        from 'material-ui-icons/Close';
import { getSequenceList,
      updateCrateQuestionFields }       from '../../../../actions';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};


class ChooseSequence extends Component {

  state = { list : [] };

  componentDidMount() {
    getSequenceList('diagnostics', 'sequenceList').then(({data}) => this.setState({list: data.data}));
  };

  onSelect = (value) => {
    updateCrateQuestionFields(value, 'sequence')
  };

  Transition = (props) => {
    return <Slide direction="up" {...props} />;
  };

  render() {
    const {open, handleRequestClose } = this.props;
    return (
      <Dialog
        fullScreen
        open={open}
        onRequestClose={handleRequestClose}
        transition={this.Transition}
      >
        <AppBar className="header-custom-black">
          <Toolbar>
            <IconButton color="contrast"
                        onClick={handleRequestClose}
                        aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography type="title" color="inherit">
              Choose Sequence
            </Typography>

          </Toolbar>
        </AppBar>

        <List>
          {this.state.list.map((item, index) =>
            (<ListItem button key={index}
                onClick={() => this.onSelect(item)}>
              <ListItemText primary={item.step} secondary="Titania" />
            </ListItem>)
          )}
        </List>

      </Dialog>
      );
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getSequenceList,
  dispatch,
}, dispatch);

export default connect(mapDispatchToProps)(ChooseSequence);