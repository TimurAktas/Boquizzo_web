import * as React from 'react'
import { Avatar, Box, Button, Grid, Paper } from '@mui/material';
import { useDispatch, useSelector} from 'react-redux';
import { AppDispatch, RootState} from '../redux/store';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { FiArrowLeft } from 'react-icons/fi';
import { getQuizData } from '../redux/quiz/quiz.action';
import { UserAnswerType } from '../redux/quiz/quiz.types';
import { socket } from '../redux/utils/socket';

export const QuizScreen: React.FC = ({}) => {
    const [isLoadingQuizzie, setIsLoadingQuizzie] = React.useState(true)
    const quizData = useSelector((state: RootState) => state.quiz.data);

    const params = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()

    const [questionIndex, setQuestionIndex] = React.useState(0)
    const [participants, setParticipants] = React.useState([])
    const [userAnswers, setUserAnswers ] = React.useState<UserAnswerType[]>([])

    const catAvatar = require('../assets/illustration/catAvatar.jpg');
    const qrCode = require('../assets/QRCode.png');
    const aufgabenBild = require('../assets/AufgabenBild.png');
        
    React.useEffect(() => {   
        if(params.id) {
            dispatch(getQuizData(params.id)).then((data) => {
                setParticipants(data.payload.participants)
                setQuestionIndex(data.payload.currentPageIndex)
                setUserAnswers(data.payload.questions[questionIndex].userAnswers)
            })

            setTimeout(() => {
                setIsLoadingQuizzie(false)
            }, 3000)

            // emitter 
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

            socket.on('sendtoEveryOne', (data) => {
                console.log(`Send to everyoneeee!!!`)
              
            });

            socket.on('changedPage', (data)=> {
                setQuestionIndex(data.newIndex)
                console.log("Hat über Server seite geandert")
                console.log("index: ", data.newIndex)
                setUserAnswers(data.newQuiz.questions[data.newIndex].userAnswers)
                // setUserAnswers(data.payload.questions[data.newIndex].userAnswers)
                // setUserAnswers(quizData?.questions[data.newIndex].userAnswers)
                // TODO: Wenn User weiter klickt, dann soll angezeigt werden wer eine Antwort abgegeben hat
            })

            socket.on('givedAnswer', (data) => {
                console.log(`${data.answer.userId} gibt die Antwort: `, data.answer)
                console.log("neue UserAnswers: ", data.userAnswers)
                setUserAnswers(data.userAnswers)
            })

        }else console.log("Keine Gültige ID")

        return () => {
          socket.off('joinedRoom');
          socket.off('leavedRoom');
          socket.off('changedPage');
          socket.off('givedAnswer');
        };
    }, []);




    //Check ob eine Taste gedrückt wurde
    React.useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);

        return () => {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    });

    //Wechsel die Frage auf vor oder zurück
    const handleUserKeyPress = (event: { key: any; keyCode: any; })=> {
        const { key, keyCode } = event;
        if(key === 'ArrowRight') socket.emit('changePage', {index: 1, oldIndex: questionIndex, quizId: params.id})
        else if(key === 'ArrowLeft')   socket.emit('changePage', {index: -1, oldIndex: questionIndex, quizId: params.id})
    };


    return (
       <Box style={{marginLeft:'auto',marginRight:'auto', width: 1400}}>
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

            <Box style={{ height: 100,display: 'flex', alignItems:'center'}}>
                <Box  style={{display: 'flex', alignItems:'center',cursor:'pointer',width: 200, }} 
                    onClick={() => {
                        socket.emit('leaveRoom', {quizId: params.id, userId:'Admin'})
                        navigate('/')
                    }}>
                    <FiArrowLeft size={34}/>
                    <label style={{fontSize:16,cursor:'pointer'}}>Zurück zu Home</label>
                </Box>
            </Box>

            <Grid style={{}} container>
                <Grid style={{}} item xs={2.4}>

                    <Box style={{}}>
                        <Box style={{height: 30, marginTop: 20}}>
                            <h3><b>{quizData?.questions[questionIndex]?.question} {questionIndex+1}/{quizData?.questions.length}</b></h3>
                        </Box>
                        <Box style={{height: 240, width:240, marginTop: 40}}>
                            <img src={aufgabenBild} width="240" height="240"/>
                        </Box>
                    </Box>
                    <Button style={{width:200, marginTop: 185}}  variant="contained" onClick={() => socket.emit('changePage', {index: -1, oldIndex: questionIndex, quizId: params.id})}>Zurück</Button> 
                </Grid>






                <Grid item xs={7} style={{}}>
                    <Box style={{height:270}}>
                        <Grid container spacing={2} style={{marginLeft: 30, marginTop:60, width: 700}}>
                            {quizData?.questions[questionIndex]?.options.map((option,i)=> {
                                let buchstabe = ''
                                switch(option.index) {
                                    case 1:
                                        buchstabe = 'A'
                                    break;
                                    case 2:
                                        buchstabe = 'B'
                                    break;
                                    case 3:
                                        buchstabe = 'C'
                                    break;
                                    case 4:
                                        buchstabe = 'D'
                                    break;
                                    case 5:
                                        buchstabe = 'E'
                                    break;
                                    case 6:
                                        buchstabe = 'F'
                                    break;
                                    default:
                                    // code block
                                }
                                
                                return (
                                    <Grid key={i} item xs={6} style={{marginTop:10, cursor:'pointer'}}>
                                        <Paper elevation={3} style={{height:60,borderRadius:10, display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                                            <label><b>{buchstabe}: </b></label>
                                            <p> {option.isRightAnswer?'True':'False'}{option.value}</p>
                                            <p></p>
                                        </Paper>
                                    </Grid>
                                )
                            })}

                        </Grid>
                    </Box>

                    <Box style={{marginLeft:10, marginTop:40,}}>
                        <h3>{userAnswers.length} von 30 Antworten gegeben</h3>
                    </Box>
                  
                    <Grid container spacing={2} style={{width:800,marginLeft:0,marginTop:10}}>
                        {userAnswers.map(({answer,userId}, i) =>
                            <Box key={i}>
                                <Avatar sx={{ width: 60, height: 60 }} alt="Remy Sharp" src={catAvatar} />
                                <label style={{ marginLeft: 6}}><b>{userId}</b></label>
                            </Box>
                        )}
                    </Grid>
                </Grid>




                <Grid style={{}} item xs={2}>
                    <Box style={{width: 240, float:'right'}}>
                        <p><b>Leaderboard anzeigen</b></p>
                        <label>{participants.length} Teilnehmer <label style={{color:'green'}}>aktiv</label> </label>
                        <p>Um beizutreten nutze den Code <b>{quizData?.quizId}</b> oder Scanne mich!</p>
                        <Box style={{height: 200, width:200, marginTop: 40}}>
                            <img src={qrCode} width="200" height="200"/>
                        </Box>
                        <Button style={{width:200, marginTop: 130}}  variant="contained" onClick={() =>  socket.emit('changePage', {index: 1, oldIndex: questionIndex, quizId: params.id})}>Weiter</Button> 
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}