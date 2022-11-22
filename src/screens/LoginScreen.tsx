import * as React from 'react'
import Button from '@mui/material/Button';
import { Container, Grid, Paper, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { authUser } from '../redux/auth/auth.action';
import { useNavigate } from 'react-router-dom';


type LoginType = {

}

export const LoginScreen: React.FC = () => {
    const [matrikelnummer, setMatrikelnummer ] = React.useState('')
    const [password, setPassword ] = React.useState('')
    
    const dispatch: AppDispatch = useDispatch();

    const navigate = useNavigate();

    const onChangeMatrikelnummer = (event:any) => {
        setMatrikelnummer(event.target.value)
    }

    const onChangePassword = (event:any) => {
        setPassword(event.target.value)
    }

    const loginUser = async () => {
        await dispatch(authUser({matrikelnummer: matrikelnummer, password: password}))
        navigate('/')
    } 

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{backgroundColor:'#cfe8fc', height: 400, width: 300,display:'flex'}}>
                <Grid>
                    <TextField style={{fontSize:10}} id="standard-basic"  value={matrikelnummer} onChange={onChangeMatrikelnummer}  label="Matrikelnummer" variant="outlined" size='small'/>
                    <TextField style={{fontSize:10}} id="standard-basic"  value={password} onChange={onChangePassword}  label="Passwort" variant="outlined" size='small'/>
                    <Button color='error' variant="contained" onClick={loginUser}>Login mit JWT</Button>
                </Grid>
            </Paper>
        </Container>
    );
}

