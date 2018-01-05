import React, { Component }   from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import PropTypes              from 'prop-types';
import { get }                from 'lodash';
import * as moment            from 'moment';
import {
  TIME_FORMAT_DOTS,
  ASSETS_ITEM
}                             from '../../../utils/constants';
//Actions
import {
  updateCrateQuestionFields,
}                             from '../../../actions';
//Components
import { AssetsModal }        from '../../common';
//UI
import Grid                   from 'material-ui/Grid';
import Button                 from 'material-ui/Button';
import Typography             from 'material-ui/Typography';
import IconButton             from 'material-ui/IconButton';
import Delete                 from 'material-ui-icons/Delete';


class AssetsList extends Component {
  state = { chooseFiles: false };

  openChooseFiles = (chooseFiles) => this.setState({chooseFiles});

  handleDelete = (list, ID, listValue, path) => {
    const filtered = list.filter(el =>  el && el.id != ID);
    const _value = listValue ? filtered : filtered[0] || null;

    updateCrateQuestionFields(_value, path);
  };

  render() {
    console.log('list')
    const { title, list, multiSelect, valuePath, path, domain, listValue } = this.props;
    const { chooseFiles } = this.state;

    const _list = list ?
      Array.isArray(list) ? list : [list]
      : [];

    return <div className="assets-list">

        <Grid container>
          <Grid item xs={12}>
            <Typography type="title">
              { title }
            </Typography>
          </Grid>
        </Grid>


        <Grid item xs={12} className="package-level-exercises">
          {_list.map((item, index) => {
            const { id, created_at, name } = item;
            const created = moment.unix(created_at).format(TIME_FORMAT_DOTS);

            return <div key={index} className="package-level-exercises-item">

              <div className="exercises-information">

                <Typography type="subheading" className="title">
                  { name }
                </Typography>

                <Typography type="body2">
                  Uploaded { created }
                </Typography>

              </div>

              <div className="delete-icon">

                <IconButton aria-label="Delete">

                  <Delete onClick={() => this.handleDelete(_list, id, listValue, valuePath)} />

                </IconButton>
              </div>
            </div>
          })}
        </Grid>


        <Grid container>
          <Grid item xs={12}>
            <Button color="primary" onClick={() => this.openChooseFiles(true)}>
              OPEN RESOURCES
            </Button>

            {chooseFiles &&
            <AssetsModal
              open={ chooseFiles }
              isSelected={ _list }
              path={ path }
              valuePath={ valuePath }
              domain={ domain }
              multiSelect={ multiSelect }
              listValue={ listValue }
              handleRequestClose={(value) => this.openChooseFiles(value)}/>}
          </Grid>
        </Grid>
      </div>
  }
}


AssetsList.defaultProps = {
  title       : 'Assets',
  list        : [],
  multiSelect : true,
  listValue   : true
};

AssetsList.propTypes = {
  path        : PropTypes.string.isRequired,
  domain      : PropTypes.string.isRequired,
  valuePath   : PropTypes.string.isRequired,
  list        : PropTypes.oneOfType([
    ASSETS_ITEM,
    PropTypes.PropTypes.arrayOf(ASSETS_ITEM)
  ]).isRequired,
  title       : PropTypes.string,
  multiSelect : PropTypes.bool,
  listValue   : PropTypes.bool
};

const mapStateToProps = state => ({store: state});
const mapDispatchToProps = dispatch => bindActionCreators({dispatch}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(AssetsList);