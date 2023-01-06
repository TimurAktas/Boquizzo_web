import * as React from 'react'
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Box, Card, CardContent, Stack} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getUserWithAccessToken } from '../redux/user/user.action';
import { getAllQuizzesFromUser } from '../redux/quiz/quiz.action';

export const HomeScreen: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const allQuizzesFromUser = useSelector((state: RootState) => state.quiz.data?.allQuizzesFromUser);

    React.useEffect(() => {
        dispatch(getUserWithAccessToken()).then(() => {
            dispatch(getAllQuizzesFromUser())
        })
    },[])

    return (
        <Box style={{marginTop:40, minWidth: 700}}>
            <Box style={{ marginLeft:'auto', marginRight:'auto', width: 1000}}>
                <Box>
                    <Button color='error' variant="contained" onClick={() =>  navigate('/newQuiz')}>+ Neues Quiz</Button>
                </Box>

                {allQuizzesFromUser?
                    <Box style={{ height: 370, minHeight:160, marginTop: 30,}}>
                        <DataGrid getRowId={(row: any) =>  row._id}  rows={allQuizzesFromUser} columns={columns}  />
                    </Box>
                :    
                    <Box style={{marginTop: 30}}>
                        <h5>Du hast aktuell keine Quizzies</h5>
                    </Box>
                }

                {/* <Box marginTop={2}>
                    <Card elevation={4} sx={{ width: 400 ,cursor:'pointer'}} >
                        <CardContent>
                        
                        </CardContent>
                    </Card>
                </Box> */}
            </Box>
            {/* title, teilnehmer, Frage, Dauer */}
        </Box>

    );
}

const columns: GridColDef[] = [
    { field: 'title', headerName: 'Titel des Quiz', minWidth: 200 },
    { field: 'quizId', headerName: 'Quiz ID', minWidth: 200 },
    { field: 'creatorId', headerName: 'Ersteller', minWidth: 200  },
    { field: 'active', headerName: 'Status', minWidth: 200 },
    { field: 'button', headerName: 'Funktionen', minWidth: 200,
    renderCell: (params) => {
        const changeQuiz = () => {
            const currentRow = params.row;
            return alert(JSON.stringify(currentRow, null, 4));
        };
    
        const deleteQuiz = () => {
            const currentRow = params.row;
            return alert(JSON.stringify(currentRow, null, 4));
        };

        return (
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="primary" size="small" onClick={changeQuiz}>Ändern</Button>
            <Button variant="outlined" color="error" size="small" onClick={deleteQuiz}>Löschen</Button>
          </Stack>
        );
    }, },
    //titel, erstellt am, status, button
];
