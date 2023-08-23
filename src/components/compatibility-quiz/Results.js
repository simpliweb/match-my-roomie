import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

import axios from 'axios';

function Results() {
  const [matchedUsers, setMatchedUsers] = useState([]);

  useEffect(() => {
    // Fetch matched users data from API
    axios.get('https://mmr2.onrender.com/dashboard/:userId')
      .then(response => {
        const matchedUsersData = response.data.profiles;
        setMatchedUsers(matchedUsersData);
      })
      .catch(error => {
        console.error('Error fetching matched users:', error);
      });
  }, []);

  return (
    <div>
      <h2>Top 10 Best Matched Users</h2>
      {matchedUsers.map(user => (
        <div key={user._id}>
          <h3>{user.firstName} {user.lastName}</h3>
          <p>Gender: {user.Gender}</p>
          <p>Age: {user.age}</p>
          <p>About: {user.about}</p>
          {user.photo && user.photo.type === 'Buffer' && (
            <img src={`data:image/jpeg;base64,${Buffer.from(user.photo.data).toString('base64')}`} alt="User's Photo" />
          )}
        </div>
      ))}
    </div>
  );
}

export default Results;