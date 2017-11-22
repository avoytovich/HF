import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Tooltip from 'material-ui/Tooltip';
import EnhancedTableHead from './TableHeader';


class TableComponent extends Component {

  onRowSelection = (value) => {
    console.log('onRowSelection', value)
  };

  onCellClick = (value) => {
    console.log('onCellClick', value)
  };


  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    page: 0,
    rowsPerPage: 5,
    data: [
      {name: 'ddd', calories: 'dv', fat: 'ddd', carbs: 'dd', protein: 'ddsds', id: '1'},
      {name: 'ddd', calories: 'dv', fat: 'ddd', carbs: 'dd', protein: 'ddsds', id: '2'},
      {name: 'ddd', calories: 'dv', fat: 'ddd', carbs: 'dd', protein: 'ddsds', id: '3'},
      {name: 'ddd', calories: 'dv', fat: 'ddd', carbs: 'dd', protein: 'ddsds', id: '4'},
      {name: 'ddd', calories: 'dv', fat: 'ddd', carbs: 'dd', protein: 'ddsds', id: '5'},
      {name: 'ddd', calories: 'dv', fat: 'ddd', carbs: 'dd', protein: 'ddsds', id: '6'},
      {name: 'ddd', calories: 'dv', fat: 'ddd', carbs: 'dd', protein: 'ddsds', id: '7'}
    ],
    columnData: [
      { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
      { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
      { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
      { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
      { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
    ]
  };



  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };


  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleClick = (event, id) => {}

  render() {
    const {
      tableHeader, tableRows,
      selectable, multiSelectable, showRowHover
    } = this.props;

    const { data, order, orderBy, selected, rowsPerPage, page, columnData } = this.state;



    return (
      <Table>
        <EnhancedTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={this.handleSelectAllClick}
          onRequestSort={this.handleRequestSort}
          rowCount={data.length}
          columnData={columnData}
        />
        <TableBody>
          {data.map(row => {
            const isSelected = this.isSelected(row.id);
            return <TableRow
              hover
              onClick={event => this.handleClick(event, row.id)}
              onKeyDown={event => this.handleKeyDown(event, n.id)}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={-1}
              key={row.id}
              selected={isSelected}
            >

              <TableCell padding="checkbox">
                <Checkbox checked={isSelected}/>
              </TableCell>
              {columnData.map( (col, index) => {
                const {id} = col;
                return <TableCell key={index}>{row[id] }</TableCell>
              })}
            </TableRow>
          })}
        </TableBody>
      </Table>
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

TableComponent.defaultProps = {
  tableRows:       [],
  tableHeader:     [],
  selectable:      true,
  multiSelectable: true,
  showRowHover:    true,
};

TableComponent.PropTypes = {
  //Content
  tableRows:   PropTypes.arrayOf(
                  PropTypes.shape({
                    title: PropTypes.string,
                    key:   PropTypes.string,
                  })
                ),
  tableHeader: PropTypes.arrayOf(PropTypes.object),

  //Styles
  selectable:       PropTypes.boolean,
  multiSelectable:  PropTypes.boolean,
  showRowHover:     PropTypes.boolean
};

export default  connect(mapStateToProps)(TableComponent);
