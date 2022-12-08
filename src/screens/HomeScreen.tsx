import * as React from 'react'
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Box, Card, CardContent} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { getUserWithAccessToken } from '../redux/user/user.action';

export const HomeScreen: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    
    React.useEffect(() => {
        dispatch(getUserWithAccessToken())
    },[])

    return (
        <Box style={{marginTop:40, minWidth: 700}}>
            <Box style={{ marginLeft:'auto', marginRight:'auto', width: 1000}}>
                <Box>
                    <Button color='error' variant="contained" onClick={() =>  navigate('/newQuiz')}>+ Neues Quiz</Button>
                </Box>

                {rows?
                    <Box style={{ height: 370,width:900, marginTop: 30,}}>
                        <DataGrid rows={rows} columns={columns}  />
                    </Box>
                :    
                    <Box style={{marginTop: 30}}>
                        <h5>Du hast aktuell keine Quizzies</h5>
                    </Box>
                }

                <Box marginTop={2}>
                    <Card elevation={4} sx={{ width: 400 ,cursor:'pointer'}} >
                        <CardContent>
                        
                        </CardContent>
                    </Card>
                </Box>
            </Box>
            {/* title, teilnehmer, Frage, Dauer */}
        </Box>

    );
}

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
