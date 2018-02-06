import React, { Component } from 'react';
import { connect }          from 'react-redux';
import get                  from 'lodash/get';
import debounce             from 'lodash/debounce';
import { PAGE }             from '../../../config';
import { browserHistory }   from 'react-router';
import { getListByPost  }   from '../../../actions';

//UI
import Grid                      from 'material-ui/Grid';
import { withStyles }            from 'material-ui/styles';
import { FormControl }           from 'material-ui/Form';
import Input, { InputAdornment } from 'material-ui/Input';
import SearchIcon                from 'material-ui-icons/Search';
import FilterIcon                from 'material-ui-icons/FilterList';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    display: 'flex',
    alignItems: 'center',
  },
});

class UserListControls extends Component {

  componentWillMount() {
    this.handleChange = debounce(this.handleChange, 500, {leading:false, trailing:true})
  }

  handleChange = (search) => {
    const currentPath = this.props.locationUrl || PAGE[this.props.path];
    const { current_page, per_page} = this.props.store.pagination;
    const { sortedBy, orderBy }  = this.props.store.sortOptional;
    const query = { orderBy, sortedBy, per_page, current_page: current_page - 1 };
    browserHistory.push({
      pathname: currentPath,
      query: search ? { ...query, ...{filter:search }} : query
    });
  };


  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  filterUsers = (userType) => {
    const { domen, path } = this.props;
    const newQuery = {
      per_page: 15,
      current_page: 0,
      limit: 15,
      page: 1,
      customer_type: userType,
    };
    getListByPost(domen, path, newQuery );
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      classes
    } = this.props;

    const { anchorEl } = this.state;

    return (
      <Grid container className='user-list-search'>
        <Grid item lg={12} md={12} xs={12}>
          <FormControl fullWidth id="user-control-container">
            <Input
                  id="search"
                  className={classes.formControl}
                  onChange={event => this.handleChange(event.target.value)}
                  placeholder='Search'
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon className = 'lock-icon'/>
                    </InputAdornment>
                  }
                />
            <div>
              <Button
                aria-owns={anchorEl ? 'fade-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
                id="filter-icon-button"
              >
                <FilterIcon className = 'lock-icon'/>
              </Button>
              <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onRequestClose={this.handleClose}
              >
                <MenuItem onClick={()=>this.filterUsers()}>All Users</MenuItem>
                <MenuItem onClick={()=>this.filterUsers('simple')}>Heal Users</MenuItem>
                <MenuItem onClick={()=>this.filterUsers('organization')}>Work Users</MenuItem>
                <MenuItem onClick={()=>this.filterUsers('clinic')}>Clinic Users</MenuItem>
              </Menu>
            </div>
          </FormControl>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  store: get(state, `tables.${ownProps.path}`)
});

UserListControls.defaultProps = {
  selected    : [],
};

export default connect(mapStateToProps)(withStyles(styles)(UserListControls));