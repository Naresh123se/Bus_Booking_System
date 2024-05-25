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
import Loader from '../Directions/Loader';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRecaptchaChange = (value) => {
    console.log("Recaptcha value:", value);
    setIsVerified(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!isVerified) {
      toast.error('Please complete the reCAPTCHA verification.');
      return;
    }
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isLoggedIn', true);
      navigate('/admin');
      window.location.reload();
    } else {
      toast.error( 'Wrong username or password');
    }
  };

  return (
    <div className=" flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className='pt-10'>
          <img src="/3.svg" alt="Logo" className="size-32 pt-14" />
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
            <div className='grid justify-items-center'>
              <Typography level="h3" component="h1">
                <b>Welcome</b>
              </Typography>
              <Typography level="body-sm">LOGIN TO ADMIN DASHBOARD.</Typography>
            </div>

            <FormControl>
              <FormLabel><AlternateEmailIcon />Username</FormLabel>
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

            <div className='mr-60' style={{ transform: 'scale(0.87)' }}>
              <ReCAPTCHA
                sitekey="6Lfuh5MpAAAAAFahhgoiOoBiwEJlunbz_mLjDl4D"
                onChange={handleRecaptchaChange}
              />
            </div>
            <Button type='Submit' value="Submit" sx={{ mt: 1, bgcolor: "#009DF8" }} onClick={handleLogin}>
              Log in
            </Button>
            {isLoading && <Loader />}
          </Sheet>
        </CssVarsProvider>
      </div>
      
    </div>
  );
};

export default LoginPage;
