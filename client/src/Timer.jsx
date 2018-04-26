import React from 'react';
import TimerActionButton from './TimerActionButton'
import * as helpers from './helpers'

class Timer extends React.Component {
  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  handleStartClick = () => {
    this.props.onStartClick(this.props.id);
  };

  handleStopClick = () => {
    this.props.onStopClick(this.props.id);
  };

  handleResetClick = () => {
    this.props.onResetClick(this.props.id);
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.id);
  };

  render() {
    const elapsedString = helpers.renderElapsedString(
      this.props.elapsed,
      this.props.runningSince
    );

    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>
            {this.props.title}
            <span
              className='right floated edit icon'
              onClick={ this.props.onEditClick }
            >
              <i className='edit icon' />
            </span>
            <span
              className='right floated trash icon'
              onClick= { this.handleDeleteClick }
            >
              <i className='trash icon' />
            </span>
          </div>
          <div className='center aligned description'>
            <h2>
              {elapsedString}
            </h2>
          </div>
        </div>
        <div className='ui two bottom attached buttons'>
          <TimerActionButton
            timerIsRunning={!!this.props.runningSince}
            onStartClick={this.handleStartClick}
            onStopClick={this.handleStopClick}
          />
          <div
            className='ui bottom attached blue basic button'
            onClick={this.handleResetClick}
          >
            Reset
          </div>
        </div>
      </div>
    );
  }
}

export default Timer
