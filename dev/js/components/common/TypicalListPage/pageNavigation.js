import React, { Component } from 'react';
import { connect } from 'react-redux';

//UI
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Table, {
  TableFooter,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import { FormControl } from 'material-ui/Form';
import Input, { InputAdornment } from 'material-ui/Input';
import MuiSvgIcon from 'material-ui/SvgIcon';

const SearchIcon = (props) => (
  <MuiSvgIcon {...props}>
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </MuiSvgIcon>
);


class PageNavigation extends Component {
  state = {
    rowsPerPage: 5,
    rows: [ 5,10,15, 2, 4, 5, 6, 7, 8, 8,  5,10,15, 2, 4, 5, 6, 7, 8, 8,  5,10,15, 2, 4, 5, 6, 7, 8, 8 ],
    numberOfRows: 5,
    page: 0,
    total: undefined
  };

  handleChangePage = (event, page) => this.setState({ page });

  handleChangeRowsPerPage = (event) => this.setState({rowsPerPage: event.target.value });

  handleChange = () => {};

  render() {

    const { rowsPerPage, page, } =  this.state;

    return (
      <Grid container className="page-navigation">
        <Grid item md={5} sm={12} >

          <Button raised className="page-navigation-button">
            + Add New
          </Button>
          <Button raised className="page-navigation-button">
            Import
          </Button>
          <Button raised className="page-navigation-button">
            Delete
          </Button>

        </Grid>

        <Grid item md={7} sm={12} >
          <Grid container className="page-pagination">
            <Grid item >
              <Table>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      count={this.state.rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Grid>

            <Grid item >
              <FormControl fullWidth>
                <Input
                  id="amount"
                  value={this.state.amount}
                  onChange={this.handleChange('amount')}
                  endAdornment={
                    <InputAdornment position="end">
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


export default PageNavigation;
