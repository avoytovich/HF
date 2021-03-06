import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import isEmpty from "lodash/isEmpty";
import debounce from "lodash/debounce";
import Dialog from "material-ui/Dialog";
import Slide from "material-ui/transitions/Slide";
import List, { ListItem } from "material-ui/List";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import CloseIcon from "material-ui-icons/Close";
import Grid from "material-ui/Grid";
import {
  updateCrateQuestionFields,
  updatePickedExercisesInPackages,
  getExercises
} from "../../../../actions";
import Button from "material-ui/Button";
import Checkbox from "material-ui/Checkbox";
import Input, { InputAdornment } from "material-ui/Input";
import SearchIcon from "material-ui-icons/Search";

class PickPackageExercisesModal extends Component {
  constructor(props) {
    super(props);
    this.getExercisesBySearch = debounce(this.getExercisesBySearch, 300);
  }
  state = {
    list: [],
    isOpen: null,
    selected: []
  };

  componentDidMount() {
    const selected = this.props.isSelected.map(item => item && item.id);
    getExercises("exercises", "exercises").then(list =>
      this.setState({ list, selected })
    );
  }

  onSelect = (event, value) => {
    const filtered = this.state.selected.filter(item => +item !== +value);
    const selected =
      filtered.length < this.state.selected.length
        ? filtered
        : filtered.concat(value);

    this.setState({ selected });
  };

  save = (selected, oldList) => {
    const list = selected.reduce((result, item) => {
      if (item) {
        const wasSelected = oldList.find(el => el && `${el.id}` === `${item}`);
        const correctValue = wasSelected || { id: +item, probability: 0 };
        correctValue.order = this.props.order;
        return result.concat(correctValue);
      }
      return [];
    }, []);
    updatePickedExercisesInPackages(
      list,
      `packageLevels[${this.props.level}].exercises`
    );
    this.props.handleRequestClose(false);
  };

  getExercisesBySearch = value => {
    getExercises("exercises", "exercises", value, null).then(list =>
      this.setState({ list })
    );
  };

  handleChange = e => {
    this.getExercisesBySearch(e.target.value);
  };

  Transition = props => <Slide direction="up" {...props} />;

  render() {
    const { open, handleRequestClose, isSelected, levelExercises } = this.props;

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
              <IconButton
                color="contrast"
                onClick={() => handleRequestClose(false)}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>

              <Typography type="title" color="inherit">
                Exercises
              </Typography>
            </div>

            <Button
              color="inherit"
              onClick={() => this.save(selected, isSelected)}
            >
              Save
            </Button>
          </Toolbar>
        </AppBar>

        <Grid container id="search-field-container">
          <Grid item xs={12}>
            <Input
              id="assets_search"
              onChange={this.handleChange}
              placeholder="Search"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon className="search-icon" />
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>

        <List>
          {list
            .filter(({ id: incomExId }) =>
              isEmpty(
                levelExercises.find(
                  ({ id: pickedLevelExId }) => pickedLevelExId === incomExId
                )
              )
            )
            .map((item, index) => (
              <ListItem key={index} className={`choose-sequence-item`}>
                <Grid container className="choose-sequence-item-header">
                  <Grid
                    item
                    xs={12}
                    className="choose-sequence-item-title"
                    onClick={event => this.onSelect(event, `${item.id}`)}
                  >
                    <Checkbox
                      checked={selected.some(el => item.id === +el)}
                      value={`${item.id}`}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {/*<Typography type="subheading" color="inherit">*/}
                      {/*<span className="choose-sequence-item-sub-title"> Title: </span> {item.title.en || item.name.en || 'Title'}*/}
                      {/*</Typography>*/}

                      <Typography type="subheading" color="inherit">
                        {/*<span className="choose-sequence-item-sub-title"> Name: </span> {item.name || item.name.en || 'Name'}*/}
                        {item.ordinal || "-"}{" "}
                        {item.name || item.name.en || "Name"}{" "}
                        {item.testing_mode && (
                          <div className={"testing_mode_true"}>T</div>
                        )}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
        </List>
      </Dialog>
    );
  }
}

PickPackageExercisesModal.defaultProps = {
  title: "Exercises",
  isSelected: [],
  multiSelect: true,
  listValue: true,
  domain: "exercises",
  path: "exercises"
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      dispatch
    },
    dispatch
  );

export default connect(mapDispatchToProps)(PickPackageExercisesModal);
