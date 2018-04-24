import React, { Component } from 'react';
import EditableTimerList from './EditableTimerList';
import ToggleableTimerForm from './ToggleableTimerForm';
import uuid from 'uuid-v4'
import * as helpers from './helpers'


class TimersDashboard extends React.Component {
  state = {
    timers: [
      {
        title: 'Learn React',
        project: 'Fullstack',
        id: uuid(),
        elapsed: 5456099,
        runningSince: Date.now(),
      },
      {
        title: 'Read PRML',
        project: 'Machine Learning',
        id: uuid(),
        elapsed: 1273998,
        runningSince: null,
      },
    ]
  }

  handleCreateFromSubmit = (timer) => {
    this.createTimer(timer);
  }

  handleEditFormSubmit = (updatedTimer) => {
    this.updateTimer(updatedTimer);
  };

  createTimer = (timer) => {
    const t = helpers.newTimer(timer);
    this.setState({
      timers: this.state.timers.concat(t),
    });
  }

  updateTimer = (updatedTimer) => {
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === updatedTimer.id) {
          return Object.assign({}, timer, {
            title: updatedTimer.title,
            project: updatedTimer.project,
          });
        } else {
          return timer;
        }
      }),
    });
  };


  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          <EditableTimerList
            timers={this.state.timers}
            onFormSubmit={this.handleEditFormSubmit}
          />
          <ToggleableTimerForm
            onFormSubmit={this.handleCreateFromSubmit}
          />
        </div>
      </div>
    );
  }
}

export default TimersDashboard
