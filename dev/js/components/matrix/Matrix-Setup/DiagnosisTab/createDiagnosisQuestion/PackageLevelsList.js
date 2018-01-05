//diagnosticAnswers
import React, { Component }    from 'react';
import { connect }             from 'react-redux';
import { bindActionCreators }  from 'redux';
import PropTypes               from 'prop-types';
import TreatmentPackageLevel   from '../../TreatmentsTab/createTreatmentsQuestion/treatmentPackageLevel';
import AddIcon                 from 'material-ui-icons/Add';
import Clear                   from 'material-ui-icons/Clear';

class PackageLevelsList extends Component {
  list = [1,2,3];


  addPackage = () => {

  };

  removePackage = () => {

  };

  render() {
    return <div>
      {this.list.map((item, index) => {
          const treatmentsPackage = '';
          const treatmentsLevels = '';
          const levelsList = [];
          const areaIds = [];
          return <div key={index}
                      style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
            <TreatmentPackageLevel
              packageItem={treatmentsPackage}
              levelItem={treatmentsLevels}
              area={areaIds || []}
              levelsList={levelsList || []}
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