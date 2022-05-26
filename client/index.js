// import React from 'react';
// import { render } from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';

// render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
  // document.getElementById('app'),
// ); 
window.addEventListener('DOMContentLoaded', () => {
  const submit = document.getElementById('submitdata');
  const myName = document.getElementById('name');
  const date = document.getElementById('date');
  const activity = document.getElementById('activity');
  const duration = document.getElementById('duration');
  const effort = document.getElementById('effort');
  const viewLog = document.getElementById('view-log')

  
  // console.log('date', date);
  // console.log('activity', activity);
  // console.log('duration', duration);
  // console.log('effort', effort);

  const postActivity = () => {
    console.log('called postActivity');
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: myName.value,
        date: date.value,
        activity: activity.value,
        duration: duration.value,
        effort: effort.value
      })
    })
      .then(data => {
        console.log('made post request to api');

      })
      .catch(err => console.log('error fetching user data: ', err))
  };

  const linkToLog = () => {
    window.location.assign('/api/activitylog');
  }

  submit.addEventListener('click', postActivity);
  viewLog.addEventListener('click', linkToLog);
});