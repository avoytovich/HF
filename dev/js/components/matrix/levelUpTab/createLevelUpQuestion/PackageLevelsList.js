//diagnosticAnswers
import React, { Component }    from 'react';
import { connect }             from 'react-redux';
import { bindActionCreators }  from 'redux';
import PropTypes               from 'prop-types';
import PLComponent             from './PL';
import AddIcon                 from 'material-ui-icons/Add';
import Clear                   from 'material-ui-icons/Clear';
import {
  updateCrateQuestionFields,
  findPackage,
  getPackagenById,
}                              from '../../../../actions';

class PackageLevelsList extends Component {
  addPackage = () => {
    const newList = this.props.packageLevelsList.concat({packageId: '', levelsList: [], levelId: ''});
    updateCrateQuestionFields(newList, `packageLevelsList`);
  };

  removePackage = (id, index) => {
    const newList = this.props.packageLevelsList.filter((item, i) => item && i !== index);
    updateCrateQuestionFields(newList, `packageLevelsList`);
  };

  render() {
    const { packageLevelsList, areaIds } = this.props;
    return <div>
      {packageLevelsList.map((item, index) => {
        const { packageId, levelId, levelsList } = item;
          return <div key={index}
                      style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
            <PLComponent
              packageId={packageId}
              levelId={levelId}
              levelsList={levelsList}
              area={areaIds || []}
              index={index}
            />
            <Clear className="margin-bottom" style={{cursor: 'pointer'}}
                   onClick={() => this.removePackage(packageId, index)}/>
          </div>
      })}
      <div className="add-answer"
           onClick={this.addPackage}>
        <AddIcon /> ADD PACKAGE
      </div>
    </div>
  }
}
export default PackageLevelsList;