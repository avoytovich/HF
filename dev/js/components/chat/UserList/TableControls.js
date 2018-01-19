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

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    display: 'flex',
    alignItems: 'center',
  },
});

class TableControls extends Component {

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

  render() {
    const {
      classes
    } = this.props;
    return (
      <Grid container className='user-list-search'>
        <Grid item lg={12} md={12} xs={12}>
          <Grid container className="page-pagination">
            <Grid item md={12} sm={12} xs={12}>
              <FormControl fullWidth>
                <Input
                  id="search"
                  className={classes.formControl}
                  onChange={event => this.handleChange(event.target.value)}
                  placeholder='Search'
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon color="grey"/>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
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
};

TableControls.propTypes = {
  createItem: PropTypes.func,
  createButtonText: PropTypes.string,
  CreateButtonIcon: PropTypes.func,
};

export default connect(mapStateToProps)(withStyles(styles)(TableControls));