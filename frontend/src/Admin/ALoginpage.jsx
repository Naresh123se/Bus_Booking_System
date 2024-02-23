import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import FormControl from '@mui/joy/FormControl';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/joy/Typography';
import FormLabel from '@mui/joy/FormLabel';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Check if the username and password are admin credentials
    if (username === 'admin' && password === 'admin123') {
      // Store session in localStorage
      localStorage.setItem('isLoggedIn', true);
      // Redirect to admin page
      navigate('/admin');
      // Reload the page
      window.location.reload();
    } else {
      // Otherwise, do something for regular user login
      alert('Regular user logged in');
      // You might want to redirect the user to a different page
    }
  };

  return (
    <>
    <div className='h-6'>
    <div className='size-32 mx-[45%] pt-10'>
      <img src="/3.svg  "  alt="okok" />
      </div>
    <CssVarsProvider>
      <Sheet
        sx={{
          width: 300,
          mx: 'auto',
          my: 1,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
          backgroundColor: 'silver',
         
         
        }}
        variant="outlined"
      >
        <div className='grid justify-items-center h'>
          <Typography level="h3" component="h1">
            <b>Welcome</b>
          </Typography>
          <Typography level="body-sm">LOGIN TO ADMIN DASHBOARD.</Typography>
        </div>

        <FormControl>
          <FormLabel> <AlternateEmailIcon />Username</FormLabel>
          <Input
            type="text"
            required
            value={username}
            placeholder="admin"
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>
            <LockIcon /> Password
          </FormLabel>
          <div style={{ position: 'relative', width: '100%' }}>
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ paddingRight: '40px' }}
            />
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
              style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)' }}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </div>
        </FormControl>

        <Button type='Submit' value="Submit" sx={{ mt: 1, bgcolor: "#009DF8" }} onClick={handleLogin}>
          Log in
        </Button>
      </Sheet>
    </CssVarsProvider>
    </div>
    </>
  );
};

export default LoginPage;
