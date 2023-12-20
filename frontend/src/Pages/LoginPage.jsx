import * as React from 'react';
import { useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { Link } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';

import LockIcon from '@mui/icons-material/Lock';

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import IconButton from '@mui/joy/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import DarkModeToggle from './DarkModeToggle'





export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login(ev) {
    ev.preventDefault();
    axios.get('http://localhost:5000/test')

  }

  return (
    <>

      <CssVarsProvider>
        <main>
          <DarkModeToggle />
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
              <Typography level="body-sm">Login in to continue.</Typography>
            </div>
            <form onSubmit={login}>

            <FormControl>

              <FormLabel > <AlternateEmailIcon />Email</FormLabel>
              <Input
                // html input attribute
                name="email"
                type="email"
                placeholder="naresh@email.com"
                value={email}
                onChange={ev => setEmail(ev.target.value)} />
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
                  onChange={ev => setPassword(ev.target.value)}
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
            
          <div  className='pt-4 pl-2'>
           Don&apos;t have an account?<Link className="underline text p-2 " to={'/register'}>Register</Link>
           </div>
            


     
            
          
            <Button  type='submit' sx={{width:"100%", marginTop:"40px"}}   >
              Log in
            </Button>
            
           
           
            </form>
        
            <Button sx={{ border: '1px solid #bfbfbe', background: 'white', '&:hover': { background: "#f4f1f0" }, color: "black", gap: '12px', paddingRight: '75px' /* margin top */ }}>
              <img src='/google.png' alt="google_icon" className='w-6 ' />Continue with google </Button>
          </Sheet>
        </main>
      </CssVarsProvider>
    </>
  );
}
