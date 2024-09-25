import React from 'react';
import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Profile: React.FC<{ username: string }> = ({ username }) => {
    const { t } = useTranslation();
    return (
        <Container sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h3" gutterBottom>
                {t('profileTitle')}
            </Typography>
            <Typography variant="body1">
                {t('profileContent')}
            </Typography>
            <Typography variant="h5" gutterBottom>
                {t('username')}: {username}
            </Typography>
        </Container>
    );
};

export default Profile;
