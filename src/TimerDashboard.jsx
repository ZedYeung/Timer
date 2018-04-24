import React from 'react';
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

  handleRemoveClick = (timerId) => {
    this.removeTimer(timerId);
  }

  handleEditFormSubmit = (updatedTimer) => {
    this.updateTimer(updatedTimer);
  };

  handleStartClick = (timerId) => {
      this.startTimer(timerId);
    };

  handleStopClick = (timerId) => {
    this.stopTimer(timerId);
  };

  createTimer = (timer) => {
    const t = helpers.newTimer(timer);
    this.setState({
      timers: this.state.timers.concat(t),
    });
  }

  removeTimer = (timerId) => {
    this.setState({
      timers: this.state.timers.filter(t => (
        t.id !== timerId
      ))
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

  startTimer = (timerId) => {
    const now = Date.now();

    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          return Object.assign({}, timer, {
            runningSince: now,
          });
        } else {
          return timer;
        }
      }),
    });
  };

  stopTimer = (timerId) => {
    const now = Date.now();

    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          const lastElapsed = now - timer.runningSince;
          return Object.assign({}, timer, {
            elapsed: timer.elapsed + lastElapsed,
            runningSince: null,
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
            onRemoveClick={this.handleRemoveClick}
            onStartClick={this.handleStartClick}
            onStopClick={this.handleStopClick}
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
