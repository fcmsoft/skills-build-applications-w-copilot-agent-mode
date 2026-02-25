import React, { useEffect, useState } from 'react';
const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
export default function Teams() {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log('Fetching Teams from', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(json => {
        const items = json.results || json;
        setData(items);
        console.log('Teams data:', items);
      });
  }, []);
  return (
    <div className="container mt-4">
      <h2 className="display-6 mb-3">Teams</h2>
      <div className="card">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {data.map((a, i) => (
                <tr key={i}>
                  <td>{a.id || i}</td>
                  <td>{a.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}