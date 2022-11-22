import * as React from 'react'
import { Box, Button, Container, Grid, Paper, TextField } from '@mui/material';
import { useDispatch, useSelector} from 'react-redux';
import { AppDispatch, RootState} from '../redux/store';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuizWithId } from '../redux/quiz/quiz.action';
import { joinQuizRoom } from '../redux/socket/socket.action';
import { io } from 'socket.io-client';
import { FiArrowLeft } from 'react-icons/fi';

export const QuizScreen: React.FC = ({}) => {
    const [isLoadingQuizzie, setIsLoadingQuizzie] = React.useState(true)
    const quizData = useSelector((state: RootState) => state.quiz.data);

    const params = useParams();
    const dispatch: AppDispatch = useDispatch();

    const socket = io("http://localhost:3001");

    const [nachrichten, setNachrichten] = React.useState({})
    const navigate = useNavigate()

    const [questionIndex, setQuestionIndex] = React.useState(0)
    
    React.useEffect(() => {
        if(params.id) {
            console.log("paramID: ", params.id)
            dispatch(getQuizWithId(params.id))
            dispatch(joinQuizRoom(params.id))

            setTimeout(() => {
                setIsLoadingQuizzie(false)
            }, 3000)

        }
        else console.log("Keine Gültige ID")

    },[])

    const sendToSocketIO = () => {
        


        socket.emit("message", {'message':'Hier steht eine Variable', 'roomName': params.id as string})
    }


    return (
       <Box>
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

            <Grid style={{height: '100vh', }} container spacing={2}>




                <Grid style={{backgroundColor:'gray'}} item xs={3}>

                    <Box style={{backgroundColor:'blue',}}>
                        <Box  style={{display: 'flex', alignItems:'center',cursor:'pointer',marginTop: 40, }}onClick={() => navigate('/')}>
                            <FiArrowLeft size={34}/>
                            <label style={{fontSize:16,cursor:'pointer'}}>Zurück zu Home</label>
                        </Box>
              

                    <Box style={{}}>
                        <p><b>{quizData?.questions[questionIndex]?.question}</b></p>
                        <Box style={{height: 200, width:200, borderWidth:1, borderStyle:'solid'}}></Box>
                        <Button style={{width:'44%'}}  variant="contained" onClick={() => setQuestionIndex(questionIndex-1)}>Zurück</Button> 
                    </Box>
                    </Box>
                </Grid>







                <Grid item xs={7} style={{}}>
                    <Grid container spacing={2}>
                        {quizData?.questions[questionIndex]?.options.map(option => {
                            return (
                                <Grid item xs={4} md={4} style={{backgroundColor:'gray', margin:10}}>
                                    <p>{option.index}{option.isRightAnswer?'True':'False'}{option.value}</p>
                                </Grid>
                            )
                        })}

                    </Grid>
                </Grid>

                <Grid style={{backgroundColor:'gray'}} item xs={2}>
                    <p><b>Leaderboard anzeigen</b></p>
                    <p>{quizData?.participants} Teilnehmer</p>
                    <p>Um beizutreten nutze den Code <b>{quizData?._id}</b> oder Scanne mich!</p>
                    <Box style={{height: 200, width:200, borderWidth:1, borderStyle:'solid'}}></Box>
                    <Button style={{width:'44%'}}  variant="contained" onClick={() => setQuestionIndex(questionIndex+1)}>Weiter</Button> 
                </Grid>
            </Grid>
        </Box>
    );
}