import React, { useEffect, useState } from 'react';
const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
export default function Activities() {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log('Fetching Activities from', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(json => {
        const items = json.results || json;
        setData(items);
        console.log('Activities data:', items);
      });
  }, []);
  return (
    <div className="container mt-4">
      <h2 className="display-6 mb-3">Activities</h2>
      <div className="card">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Type</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {data.map((a, i) => (
                <tr key={i}>
                  <td>{a.id || i}</td>
                  <td>{a.user}</td>
                  <td>{a.type}</td>
                  <td>{a.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}