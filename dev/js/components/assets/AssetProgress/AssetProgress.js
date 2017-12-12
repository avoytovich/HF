import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InsertDriveFile from 'material-ui-icons/InsertDriveFile';
import Delete from 'material-ui-icons/Delete';
import { LinearProgress } from 'material-ui/Progress';

class AssetProgress extends Component {
  state = {
    completed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    if (completed > 100) {
      this.setState({ completed: 0 });
    } else {
      const diff = Math.random() * 10;
      this.setState({ completed: completed + diff });
    }
  };

  render() {
    const {
      name,
      onDeleteClick,
      progress,
    } = this.props;
    return (
      <div className="progress-container">
        <div className="progress-name-controls-container">
          <div className="progress-name-controls-sub-container">
            <InsertDriveFile />
            <div className="progress-name">{name}</div>
          </div>
          <Delete onClick={onDeleteClick} className="c-pointer"/>
        </div>
        <div className="progress-line-container">
          <LinearProgress mode="determinate" value={progress} />
        </div>
      </div>
    );
  }
}

AssetProgress.defaultProps = {
  name: 'Name.png',
  progress: 0,
  onDeleteClick: () => console.log('delete clicked'),
};

AssetProgress.propTypes = {
  name: PropTypes.string,
  onDeleteClick: PropTypes.func,
  progress: PropTypes.number,
};

export default AssetProgress;
