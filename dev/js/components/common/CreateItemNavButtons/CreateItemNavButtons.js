//CreateItemNavButtons



class CreateItemNavButtons extends Component {
  render() {

    const {
      title,
      switchChecked,
      switchLabel,
      onSwitchChange,
      onCancelClick,
      cancelLabel,
      onSaveClick,
      saveLabel,
    } = this.props;

    return <div className="page-sub-header">

      <div>{ title }</div>

      <div className="nav-buttons">

        <Switch label={switchLabel}
                checked={switchChecked}
                onChange={onSwitchChange}/>

        <Button onClick={onCancelClick}>
          { cancelLabel }
        </Button>

        <Button raised
                dense
                onClick={onSaveClick}
                color="primary">
          { saveLabel }
        </Button>
      </div>
    </div>
  }
}

CreateItemNavButtons.defaultProps = {
  title         : 'Create',
  switchChecked : false,
  switchLabel   : 'On testing',
  onSwitchChange: (e, checked) => console.log(e, checked),
  onCancelClick : (e, checked) => console.log(e, checked),
  cancelLabel   : 'Cancel',
  onSaveClick   : (e, checked) => console.log(e, checked),
  saveLabel     : 'Save',
};

CreateItemNavButtons.propTypes = {
  title         : PropTypes.string,
  switchChecked : PropTypes.bool,
  switchLabel   : PropTypes.string,
  onSwitchChange: PropTypes.func,
  onCancelClick : PropTypes.func,
  cancelLabel   : PropTypes.string,
  onSaveClick   : PropTypes.func,
  saveLabel     : PropTypes.string,
};

export default CreateItemNavButtons;