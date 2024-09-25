import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Stack, CircularProgress, FormControlLabel, Checkbox } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { loginUser } from '../api';
import { Brightness4, Brightness7, Check, Close } from '@mui/icons-material';

const Login: React.FC<{ darkMode: boolean, handleThemeChange: () => void, setIsLoggedIn: (value: boolean) => void, setUsername: (value: string) => void }> = ({ darkMode, handleThemeChange, setIsLoggedIn, setUsername }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [username, setUsernameInput] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState<{ username?: string, password?: string }>({});
    const [loginError, setLoginError] = useState<string | null>(null);
    const [loginStatus, setLoginStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const validateUsername = (value: string) => {
        if (value.length < 4) {
            return t('usernameError');
        }
        return '';
    };

    const validatePassword = (value: string) => {
        if (value.length < 6) {
            return t('passwordError');
        }
        return '';
    };

    const handleLogin = async () => {
        setLoginStatus('loading');
        try {
            const response = await loginUser({ username, password });
            console.log('Login successful:', response);
            setLoginStatus('success');
            setIsLoggedIn(true);
            setUsername(username);
            if (rememberMe) {
                localStorage.setItem('username', username);
            }
            setTimeout(() => setLoginStatus('idle'), 2000); // Reset button after 2 seconds
            navigate('/profile', { state: { username } });
        } catch (error) {
            setLoginError(t('loginFailed'));
            setLoginStatus('error');
            setTimeout(() => setLoginStatus('idle'), 2000); // Reset button after 2 seconds
        }
    };

    return (
        <Container sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={2} sx={{ width: '100%', maxWidth: 400 }}>
                <Typography variant="h3" gutterBottom textAlign="center">
                    {t('loginTitle')}
                </Typography>
                <TextField
                    label={t('username')}
                    value={username}
                    onChange={(e) => {
                        const value = e.target.value;
                        setUsernameInput(value);
                        setErrors({
                            ...errors,
                            username: validateUsername(value)
                        });
                    }}
                    fullWidth
                    margin="normal"
                    error={!!errors.username}
                    helperText={errors.username}
                />
                <TextField
                    label={t('password')}
                    type="password"
                    value={password}
                    onChange={(e) => {
                        const value = e.target.value;
                        setPassword(value);
                        setErrors({
                            ...errors,
                            password: validatePassword(value)
                        });
                    }}
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <FormControlLabel
                    control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                    label={t('rememberMe')}
                />
                <Button
                    variant="contained"
                    onClick={handleLogin}
                    sx={{
                        backgroundColor: loginStatus === 'success' ? 'green' : loginStatus === 'error' ? 'red' : 'primary',
                        color: 'white'
                    }}
                    startIcon={
                        loginStatus === 'loading' ? <CircularProgress size={24} color="inherit" /> :
                            loginStatus === 'success' ? <Check /> :
                                loginStatus === 'error' ? <Close /> : null
                    }
                    disabled={loginStatus === 'loading'}
                    size='large'
                >
                    {loginStatus === 'idle' ? t('login') : null}
                </Button>
                {loginError && (
                    <Typography color="error" variant="body2" textAlign="center">
                        {loginError}
                    </Typography>
                )}
                <Typography variant="body2" textAlign="center">
                    {t('dontHaveAccount')} <a href="/register">{t('register')}</a>
                </Typography>
            </Stack>
        </Container>
    );
};

export default Login;
