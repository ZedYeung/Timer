import React from 'react';
import EditableTimer from './EditableTimer';


class EditableTimerList extends React.Component {
  render() {
    const timers = this.props.timers.map((timer) => (
      <EditableTimer
        key={timer.id}
        id={timer.id}
        title={timer.title}
        elapsed={timer.elapsed}
        runningSince={timer.runningSince}
        onFormSubmit={this.props.onFormSubmit}
        onDeleteClick={this.props.onDeleteClick}
        onStartClick={this.props.onStartClick}
        onStopClick={this.props.onStopClick}
        onResetClick={this.props.onResetClick}
      />
    ));

    return (
      <div id='timers'>
        {timers}
      </div>
    );
  }
}

export default EditableTimerList
