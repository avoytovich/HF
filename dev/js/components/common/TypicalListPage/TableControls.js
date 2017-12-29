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
    alignItems: 'center'
  },
});

class TableControls extends Component {

  componentWillMount() {
    this.handleChange = debounce(this.handleChange, 1000, {leading:false, trailing:true})
  }

  handleChange = (search) => {
    const currentPath = PAGE[this.props.path];
    const { current_page, per_page} = this.props.store.pagination;
    const { sortedBy, orderBy }  = this.props.store.sortOptional;
    const query = { orderBy, sortedBy, per_page, current_page: current_page - 1 };

    browserHistory.push({
      pathname: currentPath,
      query: search ? { ...query, search } : query
    });
  };

  mainClass = (selected) => `page-navigation ${selected.length ? 'active-navigation' : 'enable-navigation'}`;

  render() {
    const {
      classes,
      selected,
      createItem,
      createButtonText,
      CreateButtonIcon,
    } = this.props;
    const selectedClassName = selected.length ? 'visible-details' : 'hidden-details';
    const mainClass         = this.mainClass(selected);
    return (
      <Grid container className={mainClass}>
        <Grid item lg={8} md={7} style={{alignItems: 'center'}}>
          <Grid container className={selectedClassName}>
            <Grid md={2} item className="navigation-count">
              <Typography type="title" gutterBottom>
                {selected.length} {selected.length > 1 ? 'Items' : 'Item'} selected
              </Typography>
            </Grid>
            <Grid md={10} item className="child-buttons">
              {/*here go custom control buttons above table on pick row*/}
              {this.props.children}
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={4} md={5}>
          <Grid container className="page-pagination">
            <Grid item md={9} xs={12}>
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
            <Grid item md={3} xs={12}>
              <Button raised dense onClick={createItem} color="primary">
                { CreateButtonIcon ? <CreateButtonIcon /> : <Add /> }
                { createButtonText || 'Create' }
              </Button>
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