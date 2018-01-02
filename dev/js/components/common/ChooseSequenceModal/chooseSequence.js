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
import {
  updateCrateQuestionFields,
  getQuestionsByStep,
}                                 from '../../../actions';
import Radio                      from 'material-ui/Radio';
import Button                     from 'material-ui/Button';


class ChooseSequence extends Component {

  state = {
    list : [],
    isOpen: null,
    selected: 1,
    questions: []
  };


  componentDidMount() {
    this.setState({selected: this.props.defaultStep});
  }

  onOpen = ({step}) => {
    const _isOpen = this.state.isOpen === step ? null : step;
    this.setState({isOpen: _isOpen});

    if (_isOpen) {
      getQuestionsByStep('diagnostics', 'questionsByStep', {
        type: 'diagnostic',
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

  Transition = (props) => <Slide direction="up" {...props} />;

  render() {
    const { open, handleRequestClose, list } = this.props;
    const { isOpen, selected, questions } = this.state;

    return (
      <Dialog
        fullScreen
        open={open}
        onRequestClose={handleRequestClose}
        transition={this.Transition}
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
                Sequence of Diagnosis Questions
              </Typography>
            </div>

            <Button color="contrast" onClick={() => this.save(selected)}>
              Save
            </Button>

          </Toolbar>
        </AppBar>

        <List className="choose-sequence-list">
          {list.map((item, index) =>
            (<ListItem key={index}
                       className={`choose-sequence-item ${isOpen === item.step  ? 'open' : ''}`}
                       onClick={() => this.onOpen(item)}>

              <Grid container  className="choose-sequence-item-header">

                <Grid item xs={11} className="choose-sequence-item-title">
                  <Radio checked={selected === item.step}
                         onClick={(event) => this.onSelect(event, item.step)}/>

                  <Typography  type="title" color="inherit" className="step">
                    {item.step}.
                  </Typography>

                  <Typography type="title" color="inherit" className="title">
                     {item.title || 'Title'}
                  </Typography>
                </Grid>

                <Grid item xs={1} className="choose-sequence-item-expand">
                  {item.step === isOpen ? <ExpandLess /> : <ExpandMore />}
                </Grid>
              </Grid>
              <Collapse in={item.step === isOpen}
                        timeout="auto"
                        className="choose-sequence-collapse"
                        unmountOnExit>
                <Grid container className="margin-remove">
                  <Grid item xs={12}>
                      <List className="choose-sequence-collapse-list">
                        {questions && questions.map((questionItem, i) =>
                          (<ListItem key={i} className="choose-sequence-collapse-item">
                            {questionItem.question.en || '-'}
                          </ListItem>)
                        )}
                      </List>
                  </Grid>
                </Grid>

              </Collapse>

            </ListItem>)
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