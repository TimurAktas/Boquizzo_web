import * as React from 'react'
import Button from '@mui/material/Button';
import { Box, Container, Grid, Paper, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { authUser } from '../redux/auth/auth.action';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/config';
import axios from 'axios';
import { Errorbar } from '../components/Errorbar/Errorbar';

export const LoginScreen: React.FC = () => {
    const [nickname, setNickname ] = React.useState('')
    const [password, setPassword ] = React.useState('')

    const [errorMessage, setErrorMessage] = React.useState('')
    
    const dispatch: AppDispatch = useDispatch();

    const navigate = useNavigate();

    const onChangeNickname = (event:any) => {
        setNickname(event.target.value)
    }

    const onChangePassword = (event:any) => {
        setPassword(event.target.value)
    }

    const loginUser = async () => {
        try{
            setErrorMessage("")
            const loginUser = await axios.post(`${API_URL}/auth/login`, {  
                nickname: nickname.toLowerCase(),
                password: password.toLowerCase()
            })
            console.log(loginUser)
            if(loginUser) {
                await dispatch(authUser({nickname: nickname, password: password}))
                localStorage.setItem("accessToken", loginUser.data.token)
                navigate('/')
            };
        }
        catch(error: any){
            setErrorMessage("Username oder Passwort falsch!")
        }
    } 

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{marginTop:60, borderRadius:20}}>
                <Grid style={{marginLeft:'auto', marginRight:'auto' ,height: 400, width: 360, borderRadius:20,padding:10}}>
                    <h2>Login</h2>

                    <Box style={{marginTop:30}}>
                        <TextField style={{fontSize:10 , width: 340, marginTop: 20}} id="standard-basic"  value={nickname} onChange={onChangeNickname}  label="Nickname" variant="outlined" size='small'/>
                    </Box>
                   
                    <Box style={{marginTop:20}}>
                        <TextField type="password" style={{fontSize:10, width: 340,marginTop: 20}} id="standard-basic"  value={password} onChange={onChangePassword}  label="Passwort" variant="outlined" size='small'/>
                    </Box>
                    
                    <Errorbar errorMessage={errorMessage} />
                    <Button color='error' style={{width: 340,marginTop: 40}} variant="contained" onClick={loginUser}>Einloggen</Button>
                </Grid>
            </Paper>
        </Container>
    );
}

