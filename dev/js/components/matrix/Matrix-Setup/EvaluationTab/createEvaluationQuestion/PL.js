import React, { Component }         from 'react';
import { Async }                    from 'react-select';

import {
  updateCrateQuestionFields,
  findPackage,
  getPackagenById,
}                                   from '../../../../../actions';

import Grid                         from 'material-ui/Grid';
import Typography                   from 'material-ui/Typography';
import Select                       from 'material-ui/Select';
import Menu, { MenuItem }           from 'material-ui/Menu';


class PLComponent extends Component {
  state = { levelsList: [] };

  componentWillMount() {
    const id = this.props.packageItem;
    getPackagenById('exercises', 'packages', id, true).then((_res) => {
      const {data} = _res.packageLevels;
      const levelsList = data.map(el => el && {label: el.level, value: el.id, id: el.id});
      this.setState({levelsList});
//      updateCrateQuestionFields(levelsList, 'levelsList');
      const {id, title} = _res;
      const treatmentsPackage = {value: id, label: title, id};
      updateCrateQuestionFields(treatmentsPackage, `packageLevels[${this.props.index}]`);

    });
  }

  getPackageOptions = (input) => {
    const { area } = this.props;
    return findPackage('exercises', 'getPackageByArea', input, area).then(res => {
      const { data } = res.data;
      const _data = data.map(item =>
        Object.assign({}, { label: item.title, value: item.id, id: item.id }));
      return {
        options: _data,
        complete: true
      }
    });
  };

  onPackageChange = (value, index) => {
//    updateCrateQuestionFields(value, 'treatmentsPackage');

    if (value.id) {
      getPackagenById('exercises', 'packages', value.id, true).then((_res) => {
        const {data} = _res.packageLevels;
        const levelsList = data.map(el => el && {label: el.level, value: el.id, id: el.id});

//        this.setState({levelsList});
        updateCrateQuestionFields(levelsList, 'levelsList');
      });
    }
    else {
      this.setState({levelsList: []});
    }

  };

  handleLevelsChange = (event) => {
    const sequenceType = event.target.value;
    updateCrateQuestionFields(sequenceType, 'treatmentsLevels');
  };

  render() {
    const { packageItem, levelItem, levelsList, index } = this.props;

    console.log('packageItem', packageItem);

    return <Grid container className="row-item">
      <Grid item sm={6} xs={12}>
        <Typography
          type="caption"
          gutterBottom
          className="custom-select-title">
          Package
        </Typography>

        <Async
          name='package'
          id='package'
          loadOptions={this.getPackageOptions}
          onChange={value => this.onPackageChange(value, index)}
          placeholder={'Select package'}
          value={packageItem}
          ignoreCase ={false}
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
          Start from level
        </Typography>
        <Select
          value={levelItem}
          onChange={this.handleLevelsChange}
          disabled={!this.state.levelsList.length}
          style={{width: '100%'}}
          MenuProps={{PaperProps:{style:{width: 400}}}}
        >
          {this.state.levelsList.map((item, index) => (
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
        </Select>
      </Grid>
    </Grid>
  }
}

export default PLComponent;