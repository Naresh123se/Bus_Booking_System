import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { Link } from 'react-router-dom';

import LockIcon from '@mui/icons-material/Lock';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import IconButton from '@mui/joy/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="soft"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? <DarkModeIcon /> : <Brightness4Icon />}
    </Button>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <CssVarsProvider>
      <main>
        <ModeToggle />
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
          
          <FormControl>

            <FormLabel > <AlternateEmailIcon />Email</FormLabel>
            <Input
              // html input attribute
              name="email"
              type="email"
              placeholder="naresh@email.com"
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

          
          <Typography
            endDecorator={<Link to={'/sign-up'} className='underline text-blue-500'>Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
          <Button as={Link} to="/Register" sx={{ mt: 1 /* margin top */ }}>
            Log in
          </Button>
          <Button sx={{ border: '1px solid #bfbfbe', background: 'white', '&:hover': { background: "#f4f1f0" }, color: "black", gap:'12px' , paddingRight:'75px' /* margin top */ }}> 
         <img src='/google.png' alt="google_icon" className='w-6 '/>Continue with google </Button>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}
