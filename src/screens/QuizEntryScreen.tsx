import * as React from 'react'
import Button from '@mui/material/Button';
import { Avatar, Box, CircularProgress, Container, Grid, Paper, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { authUser } from '../redux/auth/auth.action';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { socket } from '../redux/utils/socket';
import { getQuizData } from '../redux/quiz/quiz.action';
import { UserAvatar } from '../components/UserAvatar/UserAvatar';

export const QuizEntryScreen: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const navigate = useNavigate();

    const qrCode = require('../assets/QRCode.png');
    const params = useParams();

    const quizData = useSelector((state: RootState) => state.quiz.data?.currentQuiz);

    const [participants, setParticipants] = React.useState([])

    const [isLoadingQuizzie, setIsLoadingQuizzie] = React.useState(true)

    React.useEffect(() => {
        if(params.id){
            dispatch(getQuizData(params.id)).then((data) => {
                setParticipants(data.payload.participants)
            })
        }

        setTimeout(() => {
            setIsLoadingQuizzie(false)
        }, 3000)


        socket.emit("joinRoom", {quizId: params.id, userId:'Admin'})

        // listener
        socket.on('joinedRoom', (data) => {
            console.log("has joinedddd")
            console.log(`${data.userId} ist dem Quiz ${params.id} beigetreten`)
            setParticipants(data.participants)
        });

        socket.on('leavedRoom', (data) => {
            console.log(`${data.userId} hat das Quiz ${params.id} verlassen.`)
            console.log("Teilnehmer: ", participants)
            setParticipants(data.participants)
        });
    },[])

    const startQuizAndNavigateToQuiz = () => {
        socket.emit('startQuiz', {quizId: params.id})
        navigate(`/quiz/${params.id}`)
    }
    
    return (
        <Box style={{marginTop:40, minWidth: 700}}>
            {isLoadingQuizzie && <Box style={{display: 'flex', height: '100vh', justifyContent:'center', alignItems:'center'}}>
                <Box  style={{height: 140, display:'grid'}}>
                    <Box style={{display:'flex', justifyContent:'center'}}> 
                        <CircularProgress color='inherit'/>
                    </Box>
                    <Box style={{display:'flex', justifyContent:'center'}}> 
                        <label style={{fontSize:20,cursor:'pointer'}}>Starte Quizzie mit der ID <b>{params.id}</b></label>
                    </Box>
                </Box>
            </Box>
            }
            <Box style={{marginLeft:100,marginRight:100, marginTop:40, minWidth: 700}}>        
                <Box style={{display: 'flex'}}>
                    <Box  style={{display: 'flex', alignItems:'center',cursor:'pointer'}}onClick={() => navigate(-1)}>
                        <FiArrowLeft size={34}/>
                        <label style={{fontSize:16,cursor:'pointer'}}>Zurück zu Home</label>
                    </Box>
                </Box>
            </Box>


            <Box style={{marginLeft:'auto',marginRight:'auto', marginTop:100, minWidth: 1400,maxWidth: 1600,display:'flex', justifyContent:'space-between'}}>
              
                <Box style={{paddingLeft:20,width: 700, marginRight: 20, borderRadius:10, borderWidth: 1, borderColor:'black', borderStyle:'solid'}}>
                    <h4>{quizData?.title}</h4>
                    <Button style={{width: 200, marginTop: 20}}  variant="contained"  onClick={startQuizAndNavigateToQuiz}>Quiz Starten</Button>
                </Box>

                <Box style={{width:800, paddingLeft: 20,paddingRight: 20, borderRadius:10, borderWidth: 1, borderColor:'black', borderStyle:'solid'}}>
                    <h4 style={{marginLeft:10, marginTop: 30}}>{participants.length} Teilnehmer</h4>
                    <Grid container spacing={2} style={{marginLeft:0,marginTop:10}}>
                        {participants?.map((participant, i) =>
                            <UserAvatar key={i} userId={participant}/>
                        )}
                    </Grid>
                </Box>

                <Box style={{paddingLeft:20,width: 500, marginLeft: 50, borderRadius:10, borderWidth: 1, borderColor:'black', borderStyle:'solid', height:300}}>
                        <h4>Um beizutreten nutze den Code <b>{params.id}</b> oder Scanne mich!</h4>
                        <Box style={{height: 100, width:100, marginTop: 40}}>
                            <img src={qrCode} width="150" height="150"/>
                        </Box>
                </Box>
            </Box>

        </Box>
    );
}