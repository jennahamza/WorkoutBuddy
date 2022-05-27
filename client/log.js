window.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('tbody');
  const logTitle = document.getElementById('log-title');
  const backButton = document.getElementById('back');
  const userName = window.location.href.split('=')[1];

  console.log('userName: ', userName);

   fetch(`/api/log?name=${userName}`)
      .then(data => data.json())
      .then((res) => {
        console.log('made get request to log');
        console.log('res:', res);
        logTitle.innerHTML = `${userName}'s Activity Log`
        res.forEach(act => {
          const row = document.createElement('tr');
          tableBody.appendChild(row);
          let vals = Object.values(act);
            for (let i=2; i<6; i++) {
              let val = vals[i];
              const data = document.createElement('td');
              data.innerHTML = val;
              row.appendChild(data);
            };
          });
        })
      .catch(err => console.log('error with fetch request to log: ', err))

      const goBack = () => {
        window.location.assign('/api');
      };

      backButton.addEventListener('click', goBack);
});