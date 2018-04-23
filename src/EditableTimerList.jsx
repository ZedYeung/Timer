import React, { Component } from 'react';
import EditableTimer from './EditableTimer';


class EditableTimerList extends React.Component {
  render() {
    return (
      <div id='timers'>
        <EditableTimer
          title='Learn React'
          project='Fullstack'
          elapsed='8986300'
          runningSince={null}
          editFormOpen={false}
        />
        <EditableTimer
          title='Read PRML'
          project='Machine Learning'
          elapsed='3890985'
          runningSince={null}
          editFormOpen={true}
        />
      </div>
    );
  }
}

export default EditableTimerList
