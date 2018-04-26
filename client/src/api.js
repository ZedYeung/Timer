const api = process.env.PORT || 'http://localhost:5001'

export const getTimers = () => {
  return fetch(`${api}/api/timers`, {
    headers: {
      Accept: 'application/json',
    },
  })
  .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
  .catch( () => Promise.reject('get-fail') );
}

export const createTimer = (data) => {
  return fetch(`${api}/api/timers`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
  .catch( () => Promise.reject('get-fail') );
}

export const updateTimer = (data) => {
  return fetch(`${api}/api/timers`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
  .catch( () => Promise.reject('get-fail') );
}

export const deleteTimer = (data) => {
  return fetch(`${api}/api/timers`, {
    method: 'delete',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
  .catch( () => Promise.reject('get-fail') );
}

export const startTimer = (data) => {
  return fetch(`${api}/api/timers/start`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
  .catch( () => Promise.reject('get-fail') );
}

export const stopTimer = (data) => {
  return fetch(`${api}/api/timers/stop`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
  .catch( () => Promise.reject('get-fail') );
}
