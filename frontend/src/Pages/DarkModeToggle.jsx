import React from 'react';
import Button from '@mui/joy/Button';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useColorScheme } from '@mui/joy/styles';

function DarkModeToggle() {
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
      className="rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {mode === 'light' ? <DarkModeIcon className="text-black" /> : <Brightness4Icon className="text-white" />}
    </Button>
  );
}

export default DarkModeToggle;
