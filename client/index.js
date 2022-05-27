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
  const myName = document.getElementById('name');
  const inputName = document.getElementById('submitname');
  const userText = document.getElementById('current-user')
  const resetUser = document.getElementById('resetuser')
  const date = document.getElementById('date');
  const activity = document.getElementById('activity');
  const duration = document.getElementById('duration');
  const effort = document.getElementById('effort');
  const submit = document.getElementById('submitdata');
  const submitted = document.getElementById('activity-submitted')
  const viewLog = document.getElementById('view-log');

  
  // console.log('date', date);
  // console.log('activity', activity);
  // console.log('duration', duration);
  // console.log('effort', effort);

  let currentUser;
  const logIn = () => {
    console.log('logging in');
    currentUser = myName.value;
    fetch(`/api/setuser?name=${currentUser}`)
      .then(res => {
        console.log('user verified');
      })
      .catch(err => console.log('error setting user'))
    userText.innerHTML = `Welcome, ${currentUser}! Enter an activity:`;
    myName.value = ''; 
  }

  const logOut = () => {
    console.log('logging out');
    currentUser = undefined;
    userText.innerHTML = '';
  }

  const postActivity = () => {
    console.log('called postActivity');
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: currentUser,
        date: date.value,
        activity: activity.value,
        duration: duration.value,
        effort: effort.value
      })
    })
      .then(data => {
        console.log('made post request (activity) to api');

      })
      .catch(err => console.log('error posting activity data: ', err))
      submitted.innerHTML = 'Activity logged!'
      date.value = '';
      activity.selectedIndex = 0;
      duration.value = '';
      effort.selectedIndex = 0;
  };

  const linkToLog = () => {
    console.log('leaving page');
    window.location.assign(`/api/activitylog?name=${currentUser}`);
    // fetch('/api/log', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name: currentUser,
    //   })
    // })
    //   .then(data => data.json())
    //   .then(data => {
    //     console.log('made post request (activity) to api');
    //     console.log('response: ', data)
    //     window.location.assign(`/api/activitylog:${currentUser}`);

    //   })
    //   .catch(err => console.log('error posting activity data: ', err))
  }

  inputName.addEventListener('click', logIn);
  resetUser.addEventListener('click', logOut);
  submit.addEventListener('click', postActivity);
  viewLog.addEventListener('click', linkToLog);
});