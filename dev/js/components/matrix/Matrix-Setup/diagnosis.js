import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { DIAGNOSIS_TAB }    from '../../../utils/constants/pageContent';
import { TableComponent }   from '../../../components/common/TypicalListPage';
import { browserHistory }   from 'react-router'
import PageNavigation       from '../../common/TypicalListPage/pageNavigation';
import Button               from 'material-ui/Button';
import qs                   from 'query-string';

class DiagnosisComponent extends Component {
  state = {
    selected: []
  };


  create = (id) => id ?
      browserHistory.push(`/diagnosis-create`) :
      browserHistory.push(`/diagnosis-create/${id}`);

  deleteItems = (items = []) => {

    const string = qs.stringify({ firstName: 'John', lastName: 'Doe' });
    browserHistory.push({
      pathname: '/matrix-setup/diagnosis',
      query: { order: 'asc' }
    })
  };

  deactivate = (items = []) => {alert('deactivate')};

  onRowClick = (selected = []) => this.setState({selected});

  render() {
    const { tableHeader } = DIAGNOSIS_TAB;
    const { selected } = this.state;

    return (
      <div id="diagnosis-component">

        <PageNavigation path="diagnosis">

          <Button raised dense>
            Edit
          </Button>

          <Button raised dense
            onClick={this.deleteItems}>
            Delete
          </Button>

          <Button raised dense>
            Deactivate
          </Button>

        </PageNavigation>

        <TableComponent
          path="diagnosis"
          tableHeader={ tableHeader }
          selected={selected}
          onRowClick={this.onRowClick}
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  store: state.diagnosis
});

export default  connect(mapStateToProps)(DiagnosisComponent);
