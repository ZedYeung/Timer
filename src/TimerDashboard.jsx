import React, { Component } from 'react';
import EditableTimerList from './EditableTimerList';
import ToggleableTimerForm from './ToggleableTimerForm';


class TimersDashboard extends React.Component {
  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          <EditableTimerList />
          <ToggleableTimerForm
            isOpen={true}
          />
          <ToggleableTimerForm
            isOpen={false}
          />
        </div>
      </div>
    );
  }
}

export default TimersDashboard
