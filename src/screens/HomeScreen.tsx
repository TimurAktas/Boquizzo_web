import * as React from 'react'
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Box, Card, CardContent, Stack} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getUserWithAccessToken } from '../redux/user/user.action';
import { getAllQuizzesFromUser } from '../redux/quiz/quiz.action';
import { socket } from '../redux/utils/socket';

export const HomeScreen: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const allQuizzesFromUser = useSelector((state: RootState) => state.quiz.data?.allQuizzesFromUser);
    const userData = useSelector((state: RootState) => state.user.data);

    React.useEffect(() => {
        dispatch(getUserWithAccessToken()).then(() => {
            console.log("hab einen User")
            dispatch(getAllQuizzesFromUser())
        })
    },[])

    // const socketFunction = () => {
    //     console.log("sendFunctionToSocketServer")
    //     socket.emit("sendFunctionToSocketServer", {paramWert: 'Param wert',}) 


    //     socket.on('sendFunctionToSocketServerAnswer', (data) => {
    //         console.log("Antwort vom server", data.answer)
    //     })
    // }

    return (
        <Box style={{marginTop:40, minWidth: 700}}>
            <Box style={{ marginLeft:'auto', marginRight:'auto', width: 1000}}>
                <Box style={{height:40, width:'100%', borderRadius: 10, marginTop: 20, display:'flex', justifyContent: 'space-around', alignItems:'center', borderWidth: .9, borderStyle:'solid', borderColor:'lightgray'}}>
                    <Box>
                        <label style={{fontWeight:'bold'}}>Role: </label>
                        <label>Dozent</label>
                    </Box>

                    <Box>
                        <label style={{fontWeight:'bold'}}>ID: </label>
                        <label>{userData?.id}</label>
                    </Box>

                    <Box>
                        <label style={{fontWeight:'bold'}}>Name: </label>
                        <label>{userData?.name} {userData?.surname}</label>
                    </Box>

                </Box>

                <Box style={{marginTop: 20}}>
                    <Button color='error' variant="contained" onClick={() =>  navigate('/newQuiz')}>+ Neues Quiz</Button>

                    <Button variant="contained" onClick={() => {}}>Send to Socket server</Button>
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
