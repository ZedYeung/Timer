import React from 'react';
import EditableTimerList from './EditableTimerList';
import ToggleableTimerForm from './ToggleableTimerForm';
import uuid from 'uuid-v4'
import * as helpers from './helpers'
import * as api from './api'


class TimersDashboard extends React.Component {
  state = {
    timers: []
  }

  componentDidMount() {
    this.loadTimers();
    setInterval(this.getTimers, 5000);
  }

  loadTimers = () => {
    api.getTimers().then((timers) => (
      this.setState({ timers })
    ))
  }

  handleCreateFromSubmit = (timer) => {
    this.createTimer(timer);
  }

  handleDeleteClick = (timerId) => {
    this.deleteTimer(timerId);
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

  handleResetClick = (timerId) => {
    this.resetTimer(timerId);
  };


  createTimer = (timer) => {
    const t = helpers.newTimer(timer);
    this.setState({
      timers: this.state.timers.concat(t),
    });

    api.createTimer(t);
  }

  deleteTimer = (timerId) => {
    this.setState({
      timers: this.state.timers.filter(t => (
        t.id !== timerId
      ))
    });

    api.deleteTimer({ id: timerId });
  }

  updateTimer = (updatedTimer) => {
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === updatedTimer.id) {
          return Object.assign({}, timer, {
            title: updatedTimer.title
          });
        } else {
          return timer;
        }
      }),
    });

    api.updateTimer(updatedTimer);
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

    api.startTimer({
      id: timerId,
      start: now,
    })
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

    api.stopTimer({
      id: timerId,
      stop: now,
    })
  };

  resetTimer = (timerId) => {
    const now = Date.now();

    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          return Object.assign({}, timer, {
            elapsed: 0,
            runningSince: null,
          });
        } else {
          return timer;
        }
      }),
    });

    api.resetTimer({
      id: timerId
    })
  };


  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          <EditableTimerList
            timers={this.state.timers}
            onFormSubmit={this.handleEditFormSubmit}
            onDeleteClick={this.handleDeleteClick}
            onStartClick={this.handleStartClick}
            onStopClick={this.handleStopClick}
            onResetClick={this.handleResetClick}
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
