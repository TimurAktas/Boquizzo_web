import * as React from 'react'
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllQuizzes } from '../redux/quiz/quiz.action';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getUserWithAccessToken } from '../redux/user/user.action';

export const HomeScreen: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const accessToken = useSelector((state: RootState) => state.auth.data?.token);
    const rows: GridRowsProp = [
        { id: 1, title: 'Bachelorarbeit - Quizfragen', createdAt: '26.Oktober 2022', state:'abgelaufen' },
        { id: 2, title: 'Mathe vorbereitung', createdAt: '26.Oktober 2022', state:'abgelaufen' },
        { id: 3, title: 'Algo 4.0 - Quizfragen', createdAt: '26.Oktober 2022', state:'abgelaufen' },
        { id: 4, title: 'Mathe 3 - Klausur', createdAt: '26.Oktober 2022', state:'abgelaufen' },
        { id: 5, title: 'Abstimmung', createdAt: '26.Oktober 2022', state:'abgelaufen' },
        { id: 6, title: 'Bachelorarbeit - Praxisphase', createdAt: '26.Oktober 2022', state:'abgelaufen' },
    ];

    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Titel', minWidth: 300 },
        { field: 'createdAt', headerName: 'erstellt am', minWidth: 300  },
        { field: 'state', headerName: 'Status', minWidth: 300 },
        //titel, erstellt am, status, button
    ];

    const navigate = useNavigate();
    
    React.useEffect(() => {
        console.log("BIN HIER IM HOME")
        console.log("REDUX ACCESSTOKEN: ", accessToken)
        dispatch(getAllQuizzes())
        dispatch(getUserWithAccessToken())
    },[])

    return (
        <div style={{marginLeft:200,marginRight:200, marginTop:40, minWidth: 700}}>
            <div>
                <Button color='error' variant="contained" onClick={() => navigate('/newQuiz')}>+ Neues Quiz</Button>
                <Button style={{marginLeft:20}} color='error' variant="contained">Quiz Beitreten</Button>
            </div>

            {rows?
                <div style={{ height: 370,width:900, marginTop: 30}}>
                    <DataGrid rows={rows} columns={columns}  />
                </div>
            :    
                <div style={{marginTop: 30}}>
                    <h5>Du hast aktuell keine Quizzies</h5>
                </div>
            }

            <Box marginTop={2}>
                <Card elevation={4} sx={{ width: 400 ,cursor:'pointer'}} >
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            <Chip label="gerade aktiv" color="success" variant='filled' />
                        </Typography>
                        <Typography variant="h6" component="div">
                            Bachelorarbeit - Praxisphase
                        </Typography>
                        <Typography variant="body2">
                            Teilnehmer: 25
                            
                        <br />
                        Frage: 10 / 20
                        <br />
                        Dauer: seit 25:12 Minuten
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            {/* title, teilnehmer, Frage, Dauer */}
        </div>

    );
}

