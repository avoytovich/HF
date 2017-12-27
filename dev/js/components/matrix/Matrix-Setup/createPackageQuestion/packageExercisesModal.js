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
  getExercises,
}                                 from '../../../../actions';
import Radio                      from 'material-ui/Radio';
import Button                     from 'material-ui/Button';
import TextField                  from 'material-ui/TextField';
import Checkbox                   from 'material-ui/Checkbox';


class PackageExercisesModal extends Component {
  state = {
    list : [],
    isOpen: null,
    selected: [],
  };

  componentDidMount() {
    this.setState({selected:this.props.isSelected});
    getExercises('exercises', 'exercises').then(list => this.setState({list}));
  }

  onSelect = (event, value) => {
    const filtered = this.state.selected.filter(item => +item !== +value);
    const selected = filtered.length < this.state.selected.length ? filtered : filtered.concat(value);

    this.setState({selected});
  };

  save = (selected) => {
    updateCrateQuestionFields(selected, `packageLevels[${this.props.level}].exercise_ids`);
    this.props.handleRequestClose(false);
  };

  handleChange = (e) =>
    getExercises('exercises', 'exercises', e.target.value)
    .then(list => this.setState({list}));

  Transition = (props) => <Slide direction="up" {...props} />;

  render() {
    const { open, handleRequestClose } = this.props;
    const { selected, list } = this.state;

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

        <Grid container style={{marginTop: '60px', marginLeft: '30px'}}>
          <Grid item xs={12} >
            <TextField id="time" type="text"  onChange={this.handleChange}/>
          </Grid>
        </Grid>

        <List>
          {list.map((item, index) =>
            (<ListItem key={index}
                       className={`choose-sequence-item`}>

              <Grid container  className="choose-sequence-item-header">
                <Grid item xs={12}
                      className="choose-sequence-item-title"
                      onClick={(event) => this.onSelect(event, `${item.id}`)}>
                  <Checkbox
                    checked={selected.some(el => item.id === +el)}
                    value={`${item.id}`}
                  />

                  <Typography type="title" color="inherit" className="title">
                    {item.title.en || item.name.en || 'Title'}
                  </Typography>
                </Grid>
              </Grid>

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

export default connect(mapDispatchToProps)(PackageExercisesModal);