import Axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({ email: '', password: '', confirmPassword: '' });
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    let isValid = true;

    setErrors({ email: '', password: '', confirmPassword: '' });

    if (!email) {
      setErrors((prev) => ({ ...prev, username: 'Email is required' }));
      isValid = false;
    }

    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Password is required' }));
      isValid = false;
    } else if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: 'Passwords do not match',
      }));
      isValid = false;
    }

    if (!isValid) return;

    try {
      const response = await Axios.post('http://localhost:5001/users/signup', {
        email,
        password,
      });
      console.log('Registration successful');
      toast.success('Registration successfull!');
      navigate('/');
    } catch (err) {
      console.log(err);
      toast.error('Error at registration');
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    let isValid = true;

    setErrors({ username: '', password: '', confirmPassword: '' });

    if (!email) {
      setErrors((prev) => ({ ...prev, username: 'Email is required' }));
      isValid = false;
    }

    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Password is required' }));
      isValid = false;
    }

    if (!isValid) return;

    try {
      const response = await Axios.post('http://localhost:5001/users/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log('Login successful');
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (err) {
      console.log('Login failed');
      toast.error('Error at login');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        className={
          'form-container p-4 blurry-background space-grotesk-normal glow-border'
        }
      >
        <h1 className="space-grotesk-normal mb-4">
          {isLogin ? 'Welcome back!' : 'Create an account'}
        </h1>
        <Form
          className=" login"
          onSubmit={isLogin ? loginHandler : signUpHandler}
        >
          <Form.Group className="mb-3 login" controlId="username">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              className="login-textarea"
              type="text"
              placeholder="Enter username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 login" controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              className="login-textarea"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          {!isLogin && (
            <Form.Group className="mb-3 login" controlId="confirmPassword">
              <Form.Label className="">Confirm Password:</Form.Label>
              <Form.Control
                className="login-textarea"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
          )}
          <div className="mb-3">
            <Button className="login-btn" type="submit" variant="light">
              {isLogin ? 'Log in' : 'Register'}
            </Button>
          </div>
        </Form>
        <p className="roboto-mono-normal">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <button onClick={toggleForm}>Create one</button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={toggleForm}>Log in</button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
