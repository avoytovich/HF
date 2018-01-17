import React, { Component } from 'react';
import { connect }          from 'react-redux';

//UI
import Grid                      from 'material-ui/Grid';
import { withStyles }            from 'material-ui/styles';
import { FormControl }           from 'material-ui/Form';
import Input, { InputAdornment } from 'material-ui/Input';
import MuiSvgIcon                from 'material-ui/SvgIcon';
import Button                    from 'material-ui/Button';
import Add                       from 'material-ui-icons/Add';
import Typography                from 'material-ui/Typography';

const SearchIcon = (props) => (
  <MuiSvgIcon {...props}>
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </MuiSvgIcon>
);

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    display: 'flex',
    alignItems: 'center'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});



class PageNavigation extends Component {

  handleChange = (event, value) => {};

  mainClass = (selected) => {
    return `page-navigation ${selected.length ? 'active-navigation' : 'enable-navigation'}`
  };
  render() {
    const { classes, selected, createItem } = this.props;
    const mainClass = this.mainClass(selected);
    return (
      <Grid container className={mainClass}>
        <Grid item lg={7} md={8}
              style={{alignItems: 'center'}}>
          <Grid container
                className={selected.length ? 'visible-details' : 'hidden-details'}>
            <Grid  item xs={4}
              className="navigation-count">
              <Typography type="title" gutterBottom>
                {selected.length} {selected.length > 1 ? 'Items' : 'Item'} selected
              </Typography>
            </Grid>
            <Grid  item xs={8}
                   className="child-buttons">
              {this.props.children}
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={5} md={4}>
          <Grid
            container
            className="page-pagination">
            <Grid item md={7} xs={12}>
              <FormControl fullWidth>
                <Input
                  id="search"
                  className={classes.formControl}
                  onChange={this.handleChange}
                  placeholder='Search'
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon color="grey"/>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <Button
                raised
                dense
                onClick={createItem}
                color="primary">
                <Add />
                Create
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  store: state[ownProps.path]
});

PageNavigation.defaultProps = {
  selected    : [],
};

export default connect(mapStateToProps)(withStyles(styles)(PageNavigation));