import { useState, FormEvent } from 'react';
import { UserLogin } from "../interfaces/UserLogin";
import auth from '../utils/auth';
import { login } from '../api/authAPI';

const Login = () => {
  // Initial state with empty strings
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Ensure both username and password are provided
      if (loginData.username && loginData.password) {
        const data = await login(loginData); // Call the login API
        auth.login(data.token); // Handle login in auth service
      } else {
        console.error("Username and password are required.");
      }
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username}
          onChange={handleChange}
          placeholder='Enter your username'
        />
        <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password}
          onChange={handleChange}
          placeholder='Enter your password'
        />
        <button type='submit'>Submit Form</button>
      </form>
    </div>
  );
};

export default Login;


