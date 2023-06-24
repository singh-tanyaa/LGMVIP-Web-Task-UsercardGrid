import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './lgmlogo.jpg'

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const data = await response.json();
      setUsers(data.data);
      setLoading(false);
    } catch (error) {
      console.log('Error:', error);
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
    getUsers();
  }, [page]);

  return (
    <div className="App">
      <nav>
        <div className="navbar">
        <img src={logo} alt="Logo" className='logo' />
          <div className="brand">Brand Name</div> 
          <button className="get-users-btn" onClick={getUsers}>Get Users</button>
        </div>
      </nav>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
          <div className="user-card-grid">
            {users.map((user) => (
              <div className="user-card" key={user.id}>
                <img src={user.avatar} alt={user.first_name} />
                <h3>{`${user.first_name} ${user.last_name}`}</h3>
                <p>{user.email}</p>
              </div>
            ))}
          </div>
          <button className="next-page-btn" onClick={handleNextPage}>Next Page</button>
        </>
      )}
    </div>
  );
}

export default App;