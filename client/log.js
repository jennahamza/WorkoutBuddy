window.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('tbody');

   fetch('/api/log')
      .then(data => data.json())
      .then((res) => {
        console.log('made get request to log');
        console.log('res:', res);
        res.forEach(act => {
          const row = document.createElement('tr');
          tableBody.appendChild(row);
          let vals = Object.values(act);
            for (let i=1; i<6; i++) {
              let val = vals[i];
              const data = document.createElement('td');
              data.innerHTML = val;
              row.appendChild(data);
            };
          });
        })
      .catch(err => console.log('error with fetch request to log: ', err))
});