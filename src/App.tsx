import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, CssBaseline, createTheme, ThemeProvider, Menu, MenuItem } from '@mui/material';
import { Brightness4, Brightness7, AccountCircle } from '@mui/icons-material';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile.tsx';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './i18n';

const App: React.FC = () => {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    // TODO: Rewrite to ensure safety (auto login using tokens?)
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setDarkMode(Boolean(storedTheme))
    }
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', String(darkMode))
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('username');
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <I18nextProvider i18n={i18n}>
        <Router>
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            <AppBar position="fixed">
              <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    {t('appName')}
                  </Link>
                </Typography>
                <IconButton color="inherit" onClick={handleThemeChange}>
                  {darkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
                {isLoggedIn ? (
                  <div>
                    <Button
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                      startIcon={<AccountCircle />}
                    >
                      {username}
                    </Button>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose} component={Link} to="/profile">{t('profile')}</MenuItem>
                      <MenuItem onClick={handleLogout}>{t('logout')}</MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <>
                    <Button color="inherit" component={Link} to="/register">{t('register')}</Button>
                    <Button color="inherit" component={Link} to="/login">{t('login')}</Button>
                  </>
                )}
              </Toolbar>
            </AppBar>
            <Box sx={{ mt: 8, height: 'calc(100% - 64px)' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register darkMode={darkMode} handleThemeChange={handleThemeChange} />} />
                <Route path="/login" element={<Login darkMode={darkMode} handleThemeChange={handleThemeChange} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
                <Route path="/profile" element={<Profile username={username} />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default App;
