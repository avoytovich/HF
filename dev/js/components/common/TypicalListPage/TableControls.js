import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { debounce, get }    from 'lodash';
import { PAGE }             from '../../../config';
import { browserHistory }   from 'react-router';

//UI
import Grid                      from 'material-ui/Grid';
import { withStyles }            from 'material-ui/styles';
import { FormControl }           from 'material-ui/Form';
import Input, { InputAdornment } from 'material-ui/Input';
import Button                    from 'material-ui/Button';
import Add                       from 'material-ui-icons/Add';
import Typography                from 'material-ui/Typography';
import SearchIcon                from 'material-ui-icons/Search';
import UploadIcon                from 'material-ui-icons/FileUpload';
import ArrowDropDown             from  'material-ui-icons/ArrowDropDown'
import Menu, { MenuItem }        from 'material-ui/Menu';
import { changeParamsInTable }   from '../../../actions/matrix/rulesAction';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    display: 'flex',
    alignItems: 'center',
  },
});

class TableControls extends Component {

  state = {
    anchorEl: null,
  };

  componentWillMount() {
    this.handleChange = debounce(this.handleChange, 500, {leading:false, trailing:true})
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMenuClick =(action)=>{
    this.props.toggleCSVModal(action);
    this.setState({ anchorEl: null });
  };

  handleChange = (search) => {
    const currentPath = this.props.locationUrl || PAGE[this.props.path];
    const { current_page, per_page} = this.props.store.pagination;
    const { sortedBy, orderBy }  = this.props.store.sortOptional;
    const query = { orderBy, sortedBy, per_page, current_page: current_page - 1 };
    const searchKey = this.props.searchKey || 'search';

    changeParamsInTable(`${this.props.path}.sortOptional.search`, search);

    browserHistory.push({
      pathname: currentPath,
      query: search ? { ...query, [searchKey]: search} : query
    });
  };

  mainClass = (selected) => `page-navigation ${selected.length ? 'active-navigation' : 'enable-navigation'}`;

  render() {
    const {
      classes,
      selected,
      createItem,
      uploadCSV,
      uploadCSVadd,
      createButtonText,
      CreateButtonIcon,
      store,
    } = this.props;

    const { anchorEl } = this.state;
    const defaultValue = get(store, 'sortOptional.search', '');

    const selectedClassName = selected.length ? 'visible-details' : 'hidden-details';
    const notSelectedClassName = selected.length ? 'hidden-details' : 'visible-details';
    const mainClass         = this.mainClass(selected);
    return (
      <Grid container className={mainClass}>
        <Grid item lg={8} md={7} xs={12} style={{alignItems: 'center'}}>
          <Grid container className={selectedClassName}>
            <Grid md={4} xs={6} item className="navigation-count">
              <Typography type="title" gutterBottom>
                {selected.length} {selected.length > 1 ? 'Items' : 'Item'} selected
              </Typography>
            </Grid>
            <Grid md={8} xs={6} item className="child-buttons">
              {/*here go custom control buttons above table on pick row*/}
              {this.props.children}
            </Grid>
          </Grid>
          <Grid container className={notSelectedClassName}>
            <Grid md={4} xs={6} item className="navigation-count">
              <Typography type="title" gutterBottom>
                {this.props.tableTitle}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={4} md={5} xs={12}>
          <Grid container className="page-pagination">
            <Grid item md={6} sm={6} xs={12}>
              <FormControl fullWidth>
                <Input
                  id="search"
                  defaultValue={defaultValue}
                  className={classes.formControl}
                  onChange={event => this.handleChange(event.target.value)}
                  placeholder='Search'
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon className="search-icon"/>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            {createItem?
              (<Grid item md={3} sm={3} xs={12}>
              <Button raised dense onClick={createItem} color="primary">
                  { CreateButtonIcon ? <CreateButtonIcon /> : <Add /> }
                  { createButtonText || 'Create' }
                </Button>

            </Grid>):''}
            {uploadCSV ?
              (<Grid item md={3} sm={3} xs={12}>
                <Button raised dense
                        aria-owns={anchorEl ? 'fade-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                        color="inherit">
                  <UploadIcon />
                  CSV
                  <ArrowDropDown/>
                </Button>

                <Menu
                  id="fade-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onRequestClose={this.handleClose}
                >
                  <MenuItem onClick={()=>this.handleMenuClick('add')}>Add</MenuItem>
                  <MenuItem onClick={()=>this.handleMenuClick('activate')}>Activate</MenuItem>
                  <MenuItem onClick={()=>this.handleMenuClick('deactivate')}>Deactivate</MenuItem>
                  <MenuItem onClick={()=>this.handleMenuClick('remove')} id="remove-menu-item">Remove</MenuItem>
                </Menu>

              </Grid>):''}
            {uploadCSVadd ?
              (<Grid item md={3} sm={3} xs={12}>
                <Button raised dense
                        aria-owns={anchorEl ? 'fade-menu' : null}
                        aria-haspopup="true"
                        onClick={() => this.handleMenuClick('addById')}
                        color="inherit">
                  <UploadIcon />
                  CSV
                </Button>

              </Grid>):''}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  store: get(state, `tables.${ownProps.path}`)
});

TableControls.defaultProps = {
  selected    : [],
  tableTitle  :  '',
};

TableControls.propTypes = {
  uploadCSV: PropTypes.bool,
  uploadCSVadd: PropTypes.bool,
  createItem: PropTypes.func,
  createButtonText: PropTypes.string,
  CreateButtonIcon: PropTypes.func,
  searchKey: PropTypes.string,
  toggleCSVModal: PropTypes.func,
};

export default connect(mapStateToProps)(withStyles(styles)(TableControls));