import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import FormControl from '@mui/joy/FormControl';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/joy/Typography';
import FormLabel from '@mui/joy/FormLabel';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { useLoginMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import DarkModeToggle from './DarkModeToggle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import GoogleAuth from './GoogleAuth';
import Loader from '../Directions/Loader';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Welcome to MeroBus");
      localStorage.removeItem("user");
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className='pb-28'>
        <CssVarsProvider>
          < DarkModeToggle />
          <div className='size-32 mx-[45%] pt-1 '>
            <img src="3.1.svg  " alt="logo" />
          </div>
          <Sheet
            sx={{
              width: 300,
              mx: 'auto',
              my: -3,
              py: 3,
              px: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              borderRadius: 'sm',
              boxShadow: 'md',
            }}
            variant="outlined"
          >
            <div className='grid justify-items-center'>
              <Typography level="h4" component="h1">
                <b>Welcome!</b>
              </Typography>
              <Typography level="body-sm">Sign in to continue.</Typography>
            </div>

            <FormControl>
              <FormLabel> <AlternateEmailIcon />Email</FormLabel>
              <Input
                name="email"
                type="email"
                required  // Add required attribute here
                value={email}
                placeholder="naresh@email.com"
                onChange={(e) => setEmail(e.target.value)}
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

            <Button type='Submit' value="Submit" sx={{ mt: 1, bgcolor: "#009DF8" /*  margin top */ }} onClick={submitHandler} >
              Log in
            </Button>
            {isLoading && <Loader />}
            <Typography
              endDecorator={<Link to={'/register'} className='underline text-blue-500 hover:text-[#009DF8]'>Sign up</Link>}
              fontSize="sm"
              sx={{ alignSelf: 'center' }}
            >
              Don&apos;t have an account?
            </Typography>

            <div>
              <GoogleAuth />
            </div>
          </Sheet>
        </CssVarsProvider>
      </div>
    </>
  )
}

export default LoginPage
