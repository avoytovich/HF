import React, { Component }       from 'react';
import { connect }                from 'react-redux';
import { bindActionCreators }     from 'redux';
import PropTypes              from 'prop-types';
import moment                     from 'moment';
import {
  TIME_FORMAT_DOTS,
  ASSETS_ITEM
}                                 from '../../../utils/constants';
// Action
import {
  updateCrateQuestionFields,
  getExercises,
}                                 from '../../../actions';
//UI
import { withStyles }             from 'material-ui/styles';
import Dialog                     from 'material-ui/Dialog';
import Slide                      from 'material-ui/transitions/Slide';
import List, { ListItem }         from 'material-ui/List';
import AppBar                     from 'material-ui/AppBar';
import Toolbar                    from 'material-ui/Toolbar';
import IconButton                 from 'material-ui/IconButton';
import Typography                 from 'material-ui/Typography';
import CloseIcon                  from 'material-ui-icons/Close';
import Grid                       from 'material-ui/Grid';
import Button                     from 'material-ui/Button';
import Checkbox                   from 'material-ui/Checkbox';
import Input, { InputAdornment }  from 'material-ui/Input';
import SearchIcon                 from 'material-ui-icons/Search';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    display: 'flex',
    alignItems: 'center'
  },
});

class AssetsModal extends Component {
  state = { list : [], isOpen: null, selected: [], next_page: 1, search: null, showLoadMore:true };

  componentDidMount() {
    const selected = this.props.isSelected.map(el => el && el.id);

    getExercises(this.props.domain, this.props.path, this.state.per_page)
      .then(list => this.setState({list, selected}));
  }

  onSelect = (event, selected, value) => {
    const filtered = selected.filter(item => +item !== +value);

    const list =
      filtered.length < selected.length ?
        filtered : filtered.concat(value);

    this.setState({selected: list});
  };

  save = (selected, listValue) => {
    const list = this.state.list.filter(item =>
      selected.some(selectedId => `${item.id}` === `${selectedId}`));

    const _list = listValue ? list : list[0] || '';

    updateCrateQuestionFields(_list, this.props.valuePath);

    this.props.handleRequestClose(false);
  };

  handleChange = (e) => {
    this.setState({search: e.target.value});
    console.log(this.state.list.length);
    getExercises(this.props.domain, this.props.path, e.target.value, null, this.state.list.length)
      .then(list => this.setState({list}));
  };

  _loadMoreFunction = () => {
    this.setState({next_page: this.state.next_page+1});
    getExercises(this.props.domain, this.props.path, this.state.search,  this.state.next_page+1)
      .then(list => {
        if(list.length) {
          return this.setState({
            list: [
              ...this.state.list,
              ...list],
            showLoadMore: true
          })
        }
        this.setState({showLoadMore: false})
      });

  };

  Transition = (props) => <Slide direction="up" {...props} />;

  render() {
    const { classes, open, handleRequestClose, title, multiSelect, listValue } = this.props;
    const { selected, list, showLoadMore} = this.state;

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
                { title }
              </Typography>
            </div>

            <Button color="contrast" onClick={() => this.save(selected, listValue)}>
              Save
            </Button>

          </Toolbar>
        </AppBar>

        <Grid container id="search-field-container">
          <Grid item sm={3} xs={12} >
            <Input
              className={classes.formControl}
              id="assets_search"
              onChange={this.handleChange}
              placeholder='Search'
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon className="search-icon"/>
                </InputAdornment>
              }
            />


          </Grid>
        </Grid>

        <List>
          {list.map((item, index) => {
            const { id, name, created_at, title } = item,
                  created = moment.unix(created_at).format(TIME_FORMAT_DOTS),
                  checked = selected.some(el => id === +el),
                  disabled = !!selected.length && !multiSelect && !checked;


            return <ListItem key={index}
                             className='choose-sequence-item'>

              <Grid container  className="choose-sequence-item-header">
                <Grid item xs={12}
                      className="choose-sequence-item-title"
                      onClick={(event) => !disabled && this.onSelect(event, selected, `${id}`)}>
                  <Checkbox
                    checked={checked}
                    value={`${id}`}
                    disabled={disabled}
                  />
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Typography type="subheading">
                      <span className="choose-sequence-item-sub-title"> Name: </span> {name || '-'}
                    </Typography>

                    <Typography type="subheading">
                      <span className="choose-sequence-item-sub-title"> Title: </span> {title || 'Title'}
                    </Typography>

                    <Typography type="caption" >
                      Uploaded { created }
                    </Typography>
                  </div>

                </Grid>
              </Grid>

            </ListItem>})}
        </List>
        {showLoadMore?
          <div className='load-more-assets-button'
                    onClick={this._loadMoreFunction}>
                    {'Load more'}
          </div>:
          ''
        }

      </Dialog>
    );
  }
}

AssetsModal.defaultProps = {
  title       : 'Assets',
  isSelected  : [],
  multiSelect : true,
  listValue   : true,
  domain      : 'exercises',
  path        : 'assets',
  valuePath   : 'exercise.files.data',
};

AssetsModal.propTypes = {
  open        : PropTypes.bool.isRequired,
  path        : PropTypes.string.isRequired,
  domain      : PropTypes.string.isRequired,
  isSelected  : PropTypes.PropTypes.arrayOf(ASSETS_ITEM),
  multiSelect : PropTypes.bool,
  listValue   : PropTypes.bool,
  title       : PropTypes.string,
};


const mapDispatchToProps = dispatch => bindActionCreators({dispatch}, dispatch);

export default connect(mapDispatchToProps)(withStyles(styles)(AssetsModal));