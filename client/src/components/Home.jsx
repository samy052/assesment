import { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [users, setUsers] = useState([]); // State to hold user data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors
  const [editUserId, setEditUserId] = useState(null); // State to track which user is being edited
  const [formData, setFormData] = useState({ username: '', email: '' }); // State for form data

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data); // Set the fetched user data
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUsers(); // Call the fetch function
  }, []);

  // Display loading state
  if (loading) {
    return <p>Loading users...</p>;
  }

  // Display error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Function to handle user deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return; // User canceled the delete action

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Remove the deleted user from the state
      setUsers(users.filter(user => user._id !== id));
      alert('User deleted successfully');
    } catch (error) {
      setError(error.message); // Handle the error
      alert('Error deleting user: ' + error.message);
    }
  };

  // Function to handle user update
  const handleEdit = (user) => {
    setEditUserId(user._id);
    setFormData({ username: user.username, email: user.email }); // Populate form with user data
  };

  // Function to handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission for updating user
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
      setEditUserId(null); // Reset edit user ID
      setFormData({ username: '', email: '' }); // Clear form
      alert('User updated successfully');
    } catch (error) {
      setError(error.message); // Handle the error
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
