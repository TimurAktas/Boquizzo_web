import * as React from 'react'
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Box, Card, CardContent, Chip, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


type LoginType = {
    loginUser: () => void;
};

export const LoginScreen: React.FC<LoginType> = ({loginUser}) => {
    return (
        <Container maxWidth="sm">
            <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
                <label>Login Screen</label>
                <Button color='error' variant="contained" onClick={() => loginUser()}>Einloggen</Button>
            </Box>
        </Container>
    );
}

