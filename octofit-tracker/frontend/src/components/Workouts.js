import React, { useEffect, useState } from 'react';
const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
export default function Workouts() {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log('Fetching Workouts from', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(json => {
        const items = json.results || json;
        setData(items);
        console.log('Workouts data:', items);
      });
  }, []);
  return (
    <div className="container mt-4">
      <h2 className="display-6 mb-3">Workouts</h2>
      <div className="card">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {data.map((a, i) => (
                <tr key={i}>
                  <td>{a.id || i}</td>
                  <td>{a.name}</td>
                  <td>{a.difficulty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}