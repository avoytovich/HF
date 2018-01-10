//diagnosticAnswers
import React, { Component }    from 'react';
import { connect }             from 'react-redux';
import { bindActionCreators }  from 'redux';
import PropTypes               from 'prop-types';
import PLComponent              from './PL';
import AddIcon                 from 'material-ui-icons/Add';
import Clear                   from 'material-ui-icons/Clear';

class PackageLevelsList extends Component {
  list = [1,2,3];


  addPackage = () => {

  };

  removePackage = () => {

  };

  render() {
    const { packageLevelsList, areaIds } = this.props;
    return <div>
      {packageLevelsList.map((item, index) => {
        const { packageId, id } = item;
          const levelsList = [];
          return <div key={index}
                      style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
            <PLComponent
              packageId={packageId || null}
              levelItem={id || null}
              area={areaIds || []}
              levelsList={levelsList}
              index={index}
            />
            <Clear className="margin-bottom" style={{cursor: 'pointer'}}
                   onClick={() => this.removePackage(index)}/>
          </div>
      })}
      <div className="add-answer"
           onClick={this.addPackage}>
        <AddIcon /> ADD ANSWER
      </div>
    </div>
  }
}
export default PackageLevelsList;