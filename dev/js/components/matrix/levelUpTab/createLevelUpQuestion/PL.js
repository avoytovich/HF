import React, { Component }         from 'react';
import { connect }                  from 'react-redux';
import { Async }                    from 'react-select';
import Select from 'react-select';
import PropTypes                    from 'prop-types';

import {
  updateCrateQuestionFields,
  findPackage,
  getPackagenById,
}                                   from '../../../../actions';

import Grid                         from 'material-ui/Grid';
import Typography                   from 'material-ui/Typography';
import SelectMaterial               from 'material-ui/Select';
import Menu, { MenuItem }           from 'material-ui/Menu';


class PLComponent extends Component {
  state = {
    levelsList: [],
    options:[]
  };

  componentWillMount() {
    const id = this.props.packageId;
    if (id) {
      getPackagenById('exercises', 'packages', id, true).then((_res) => {
        if (!_res.packageLevels) return;
        let options = [];
        let optionObject= {
          label:_res.title,
          value:_res.id,
          id:_res.id
        };
        options.push(optionObject);
        const {data} = _res.packageLevels;
        const levelsList = data.map(el => el && {label: el.level, value: el.id, id: el.id});
        this.setState({options: options});
        updateCrateQuestionFields(levelsList, `packageLevelsList[${this.props.index}].levelsList`);
      });
    }

  }

  getPackageOptions = (input) => {
    const { area } = this.props;
    return findPackage('exercises', 'getPackageByArea', input, area).then(res => {
      const { data } = res.data;
      const options = data.map(item =>
        Object.assign({}, { label: item.title, value: item.id, id: item.id }));
      this.setState({options});
      return {
        options: _data,
        complete: true
      }
    });
  };

  onPackageChange = (value, index) => {
    //Todo: write methods for multi arguments
    updateCrateQuestionFields(value.id, `packageLevelsList[${index}].packageId`);
    updateCrateQuestionFields([], `packageLevelsList[${index}].levelsList`);
    updateCrateQuestionFields('', `packageLevelsList[${index}].levelId`);

    if (value.id) {

      getPackagenById('exercises', 'packages', value.id, true).then((_res) => {
        const {data} = _res.packageLevels;
        const levelsList = data.map(el => el && {label: el.level, value: el.id, id: el.id});
        updateCrateQuestionFields(levelsList, `packageLevelsList[${index}].levelsList`);
      });
    }
    else {
      updateCrateQuestionFields([], `packageLevelsList[${index}].levelsList`);
    }

  };

  handleLevelsChange = (event, index) =>
    updateCrateQuestionFields(event.target.value, `packageLevelsList[${index}].levelId`);

  render() {
    const { packageId, levelId, levelsList, index } = this.props;

    return <Grid container className="row-item">
      <Grid item sm={6} xs={12}>
        <Typography
          type="caption"
          gutterBottom
          className="custom-select-title">
          Package
        </Typography>

        <Select
          name='package'
          id='package'
          options={this.state.options}
          onInputChange={this.getPackageOptions}
          /*onChange={value => this.onPackageChange(value, index)}*/
          placeholder={'Select package'}
          value={packageId}
          clearable={false}
        />
      </Grid>

      <Grid item sm={6} xs={12}>
        <Typography
          type="caption"
          gutterBottom
          className="custom-select-title"
          style={{marginBottom:'8px'}}
        >
          Level
        </Typography>
        <SelectMaterial
          value={levelId}
          onChange={event => this.handleLevelsChange(event, index)}
          disabled={!levelsList.length}
          style={{width: '100%'}}
          MenuProps={{PaperProps:{style:{width: 400}}}}
        >
          {levelsList.map((item, index) => (
            <MenuItem
              key={item.value}
              value={item.value}
              style={{
                fontWeight: levelsList.indexOf(item.value) !== -1 ? '500' : '400',
              }}
            >
              Level {item.label}
            </MenuItem>
          ))}
        </SelectMaterial>
      </Grid>
    </Grid>
  }
}

PLComponent.defaultProps = {
  levelsList       : [],
  levelId          : ''
};

const mapStateToProps = state => ({store: state.createDiagnosisQuestion});

export default  connect(mapStateToProps)(PLComponent);
