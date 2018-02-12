import React, { Component }       from 'react';
import { connect }                from 'react-redux';
import { bindActionCreators }     from 'redux';
import Dialog                     from 'material-ui/Dialog';
import Slide                      from 'material-ui/transitions/Slide';
import List, { ListItem }         from 'material-ui/List';
import AppBar                     from 'material-ui/AppBar';
import Toolbar                    from 'material-ui/Toolbar';
import IconButton                 from 'material-ui/IconButton';
import Typography                 from 'material-ui/Typography';
import CloseIcon                  from 'material-ui-icons/Close';
import Collapse                   from 'material-ui/transitions/Collapse';
import Grid                       from 'material-ui/Grid';
import ExpandLess                 from 'material-ui-icons/ExpandLess';
import ExpandMore                 from 'material-ui-icons/ExpandMore';
import Lens                       from 'material-ui-icons/Lens';

import {
  updateCrateQuestionFields,
  getQuestionsByStep,
}                                 from '../../../actions';
import Radio                      from 'material-ui/Radio';
import Button                     from 'material-ui/Button';
import capitalize                 from 'lodash/capitalize';
import SequenceTitle              from './SequenceTitle';

class ChooseSequence extends Component {

  state = {
    list : [],
    isOpen: null,
    selected: 1,
    questions: [],
    openTitle: ''
  };


  componentDidMount() {
    this.setState({selected: this.props.defaultStep});
  }

  onOpen = ({step}) => {
    const _isOpen = this.state.isOpen === step ? null : step;
    this.setState({isOpen: _isOpen});

    if (_isOpen) {
      getQuestionsByStep('diagnostics', 'questionsByStep', {
        type: this.props.reqType,
        area: null,
        step,
      }).then(questions => this.setState({questions}));
    }
    else {
      this.setState({questions: []});
    }
  };

  save = (step) => {
    updateCrateQuestionFields(step, 'sequence');
    this.props.handleRequestClose(false);
  };

  onSelect = (event, selected) => {
    event && event.stopPropagation();
    this.setState({selected});
  };

  openTitleModal = (e, step) => {
    e && e.stopPropagation();
    this.setState({openTitle: step});
  };

  update = () => {
    this.setState({openTitle: ''});
    this.props.updateList();
  };

  Transition = (props) => <Slide direction="up" {...props} />;

  render() {
    const { open, handleRequestClose, list, updateList, reqType } = this.props;
    const { isOpen, selected, questions, openTitle } = this.state;

    return (
      <Dialog
        fullScreen
        open={open}
        onRequestClose={handleRequestClose}
        transition={this.Transition}
        className="sequence-modal"
      >
        <AppBar className="header-custom-black">
          <Toolbar className="choose-sequence-toolbar">
            <div className="title-and-close">
              <IconButton color="contrast"
                          onClick={() => handleRequestClose(false)}
                          aria-label="Close">
                <CloseIcon />
              </IconButton>

              <Typography type="title" color="inherit">
                Sequence of {capitalize(reqType)} Questions
              </Typography>
            </div>

            <Button color="contrast" onClick={() => this.save(selected)}>
              Save
            </Button>

          </Toolbar>
        </AppBar>

        <List className="choose-sequence-list">
          {
            list.map((item, index) => {
              return (
                <ListItem key={index}
                                className={`choose-sequence-item ${isOpen === item.step ? 'open' : ''}`}
                                onClick={() => this.onOpen(item)}>

                  <Grid container className="choose-sequence-item-header">

                    <Grid item xs={11} className="choose-sequence-item-title">
                      <Radio checked={selected === item.step}
                             onClick={(event) => this.onSelect(event, item.step)}/>

                      <Typography type="title" color="inherit" className="step">
                        {item.step}.
                      </Typography>

                      <Typography type="title" color="inherit" className="title"
                                  onClick={event => this.openTitleModal(event, item.step)}>
                        {item.title || 'Title'}
                      </Typography>
                    </Grid>

                    <Grid item xs={1} className="choose-sequence-item-expand">
                      {item.step === isOpen ? <ExpandLess /> : <ExpandMore />}
                    </Grid>
                  </Grid>

                  {openTitle === item.step && <SequenceTitle item={item}
                                                             update={this.update}
                                                             onClose={() => this.setState({ openTitle: '' })}/>}

                  <Collapse in={item.step === isOpen}
                            timeout="auto"
                            className="choose-sequence-collapse"
                            unmountOnExit>
                    <Grid container className="margin-remove">
                      <Grid item xs={12}>
                        <List className="choose-sequence-collapse-list">
                          {questions && questions.map((questionItem, i) => {
                            console.log(questionItem);
                            return (<ListItem key={i} className="choose-sequence-collapse-item">
                              <Lens style={{ width: 10, height: 10, marginRight: '10px', fill: '#4184f3' }}/>
                              {questionItem.title || '-'}
                            </ListItem>)
                          })}
                        </List>
                      </Grid>
                    </Grid>

                  </Collapse>
                </ListItem>
                )
            }
          )}
        </List>
      </Dialog>
      );
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapDispatchToProps)(ChooseSequence);