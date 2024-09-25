import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@mui/icons-material/Check';
import { registerUser } from '../api';

const Register: React.FC<{ darkMode: boolean, handleThemeChange: () => void }> = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<{ username?: string, password?: string, confirmPassword?: string }>({});
    const [open, setOpen] = useState(false);
    const [agree, setAgree] = useState(false);
    const [registerError, setRegisterError] = useState<string | null>(null);

    const validateUsername = (value: string) => {
        if (value.length < 4) {
            return t('usernameError');
        }
        return '';
    };

    const validatePassword = (value: string) => {
        const charset = /^[a-zA-Z0-9_!@#$%^&*()]*$/;
        if (value.length < 6) {
            return t('passwordError');
        }
        if (!charset.test(value)) {
            return t('charsetError');
        }
        return '';
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        setAgree(true);
        setOpen(false);
    };

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setErrors({
                ...errors,
                confirmPassword: t('confirmPasswordError')
            });
            return;
        }

        try {
            const response = await registerUser({ username, password });
            console.log('Registration successful:', response);
            navigate('/login', { state: { username } });
        } catch (error) {
            setRegisterError(t('registerFailed'));
        }
    };

    return (
        <Container sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={2} sx={{ width: '100%', maxWidth: 400 }}>
                <Typography variant="h3" gutterBottom textAlign="center">
                    {t('registerTitle')}
                </Typography>
                <TextField
                    label={t('username')}
                    value={username}
                    onChange={(e) => {
                        const value = e.target.value;
                        setUsername(value);
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
                <TextField
                    label={t('confirmPassword')}
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                        const value = e.target.value;
                        setConfirmPassword(value);
                        setErrors({
                            ...errors,
                            confirmPassword: value !== password ? t('confirmPasswordError') : ''
                        });
                    }}
                    fullWidth
                    margin="normal"
                    error={confirmPassword !== password}
                    helperText={confirmPassword !== password ? t('confirmPasswordError') : ''}
                />
                <Button
                    variant={agree ? "contained" : "outlined"}
                    onClick={handleClickOpen}
                    sx={{ backgroundColor: agree ? 'green' : 'inherit' }}
                    size='large'
                >
                    {agree ? <CheckIcon /> : t('readAgreement')}
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{t('agreementTitle')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t('agreementContent')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>{t('cancel')}</Button>
                        <Button onClick={handleAgree} color="primary">{t('agree')}</Button>
                    </DialogActions>
                </Dialog>
                <Button
                    variant="contained"
                    disabled={!agree}
                    onClick={handleRegister}
                    sx={{ backgroundColor: agree ? 'primary' : 'grey' }}
                    size='large'
                >
                    {t('registerDescription')}
                </Button>
                {registerError && (
                    <Typography color="error" variant="body2" textAlign="center">
                        {registerError}
                    </Typography>
                )}
                <Typography variant="body2" textAlign="center">
                    {t('alreadyHaveAccount')} <a href="/login">{t('login')}</a>
                </Typography>
            </Stack>
        </Container>
    );
};

export default Register;
