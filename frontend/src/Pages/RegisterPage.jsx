import React from 'react';
import { useState, useEffect } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
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
import PersonIcon from '@mui/icons-material/Person';
import DarkModeToggle from './DarkModeToggle';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';


import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';


const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);


  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

  };



  return (
    <CssVarsProvider>
      < DarkModeToggle />
      <Sheet
        sx={{
          width: 300,
          mx: 'auto',
          my: 4,
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

          <FormLabel > <PersonIcon />Full name</FormLabel>
          <Input
            // html input attribute
            name="name"
            type="name"
            placeholder="e.g Naresh Sejwal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>




        <FormControl>

          <FormLabel > <AlternateEmailIcon />Email</FormLabel>
          <Input
            // html input attribute
            name="email"
            type="email"
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

        <Button type='Submit' value="Submit" sx={{ mt: 1 /* margin top */ }} onClick={submitHandler} >
          Sign up
        </Button>



        <Typography
          endDecorator={<Link to={'/login'} className='underline text-blue-500'>Log in</Link>}
          fontSize="sm"
          sx={{ alignSelf: 'center' }}
        >
          Don&apos;t have an account?
        </Typography>



      </Sheet>
    </CssVarsProvider>
  )
}

export default RegisterPage