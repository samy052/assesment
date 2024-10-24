import { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [editUserId, setEditUserId] = useState(null); 
  const [formData, setFormData] = useState({ username: '', email: '' }); 

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchUsers(); 
  }, []);

  e
  if (loading) {
    return <p>Loading users...</p>;
  }

 
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Function to handle user deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return; 

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

     
      setUsers(users.filter(user => user._id !== id));
      alert('User deleted successfully');
    } catch (error) {
      setError(error.message); 
      alert('Error deleting user: ' + error.message);
    }
  };

  
  const handleEdit = (user) => {
    setEditUserId(user._id);
    setFormData({ username: user.username, email: user.email }); 
  };

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${editUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await response.json();
      setUsers(users.map(user => (user._id === updatedUser._id ? updatedUser : user))); // Update user in state
      setEditUserId(null); 
      setFormData({ username: '', email: '' }); 
      alert('User updated successfully');
    } catch (error) {
      setError(error.message); 
      alert('Error updating user: ' + error.message);
    }
  };

  // Render users and update form
  return (
    <div className='home'>
      {error && <p className="error">{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <span>{user.username} ({user.email})</span>
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editUserId && (
        <div>
          <h3>Update User</h3>
          <form onSubmit={handleUpdate}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit">Update User</button>
            <button type="button" onClick={() => setEditUserId(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
