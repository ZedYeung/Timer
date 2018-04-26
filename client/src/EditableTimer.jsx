import React from 'react';
import TimerForm from './TimerForm'
import Timer from './Timer'

class EditableTimer extends React.Component {
  state = {
    editFormOpen: false,
  };

  handelEditClick = () => {
    this.openForm();
  };

  handleFormClose = () => {
    this.closeForm();
  };

  handleSubmit = (timer) => {
    this.props.onFormSubmit(timer);
    this.closeForm();
  }

  closeForm = () => {
    this.setState({ editFormOpen: false });
  }

  openForm = () => {
    this.setState({ editFormOpen: true });
  }

  render() {
    if (this.state.editFormOpen) {
      return (
        <TimerForm
          id={this.props.id}
          title={this.props.title}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <Timer
          id={this.props.id}
          title={this.props.title}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
          onEditClick={this.handelEditClick}
          onDeleteClick={this.props.onDeleteClick}
          onStartClick={this.props.onStartClick}
          onStopClick={this.props.onStopClick}
        />
      );
    }
  }
}

export default EditableTimer
