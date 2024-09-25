import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Container sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    {t('welcome')}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    {t('description')}
                </Typography>
                <Button variant="contained" color="primary">
                    {t('getStarted')}
                </Button>
            </Box>
        </Container>
    );
}

export default Home;
