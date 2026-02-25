import React, { useEffect, useState } from 'react';
const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
export default function Leaderboard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log('Fetching Leaderboard from', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(json => {
        const items = json.results || json;
        setData(items);
        console.log('Leaderboard data:', items);
      });
  }, []);
  return (
    <div className="container mt-4">
      <h2 className="display-6 mb-3">Leaderboard</h2>
      <div className="card">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {data.map((a, i) => (
                <tr key={i}>
                  <td>{a.id || i}</td>
                  <td>{a.team}</td>
                  <td>{a.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}