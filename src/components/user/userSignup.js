import { useState } from 'react';
import axios from 'axios'

const UserSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
   axios.post('http://localhost:3000/user/signup',{
    name:formData.name,
    email:formData.email,
    username: formData.username,
    password:formData.password
   })

.then((response) => {
      console.log('Response:', response.data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
    </form>
  );
  }


export default UserSignUp
