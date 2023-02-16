import * as React from 'react'
import { Avatar, Box, Button, Grid, Modal, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector} from 'react-redux';
import { AppDispatch, RootState} from '../redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { getQuizData } from '../redux/quiz/quiz.action';
import { LeaderBoardType, UserAnswerType } from '../redux/quiz/quiz.types';
import { socket } from '../redux/utils/socket';
import { GraphBar } from '../components/GraphBar/GraphBar';
import {GiTrophy} from "react-icons/gi"

export const QuizScreen: React.FC = ({}) => {
    const quizData = useSelector((state: RootState) => state.quiz.data?.currentQuiz);

    const params = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()

    const [questionIndex, setQuestionIndex] = React.useState(0)
    const [participants, setParticipants] = React.useState([])
    const [leaderBoard, setLeaderBoard] = React.useState<LeaderBoardType[]>([])
    const [userAnswers, setUserAnswers ] = React.useState<UserAnswerType[]>([])

    //Frage auflösen
    const [questionResolve, setQuestionResolve] = React.useState(false)
    const [secondsToAnswer, setSecondsToAnswer] = React.useState(0)
    const [resolveAnswers, setResolveAnswers] = React.useState(false)

    const [modalOpen, setModalOpen] = React.useState(false)

    const catAvatar = require('../assets/illustration/catAvatar.jpg');
    const qrCode = require('../assets/QRCode.png');
    const aufgabenBild = require('../assets/AufgabenBild.png');


    const [dataSets, setDataSets] = React.useState<number[]>()
    const [labels, setLabels] = React.useState<String[]>()
        
    React.useEffect(() => {
        if(params.id) {
            dispatch(getQuizData(params.id)).then((data) => {
                setParticipants(data.payload.participants)
                setLeaderBoard(data.payload.leaderboard)
                setQuestionIndex(data.payload.currentPageIndex)
                setUserAnswers(data.payload.questions[questionIndex].userAnswers)
                setSecondsToAnswer(data.payload.questions[questionIndex]?.secondsToAnswer)
            })

            setTimeout(() => {
                socket.emit("startTimer", {quizId: params.id, secondsToAnswer: quizData?.questions[questionIndex]?.secondsToAnswer}) 
            }, 500)

            // emitter 
            socket.emit("joinRoom", {quizId: params.id, userId:'Admin'})

            socket.on('timerSeconds', (data) => {
                console.log("Zeit zum antworten", data.secondsToAnswer)
                setSecondsToAnswer(data.secondsToAnswer)
                if(data.secondsToAnswer === 0 ) {
                    socket.emit('resolveQuestion', {quizId: params.id, question: quizData?.questions[questionIndex]})
                    //Schicke die richtigen Antworten an jeden und jeder der richtig geantwortet hat soll Punkte erhalten
                    //jeweils mit intervall
                }
            })

            socket.on('resolvedQuestion', (data) => {
                setResolveAnswers(true)
                setLeaderBoard(data.leaderBoard)
              
                console.log("RESOLVED QUESTION: ")
                console.log(data.userAnswers)
                console.log("DATA OPTIONS: ", data.options)

                const options: String[] = []
                const dataSets: number[] = [0,0,0,0,0,0,0,0,0,0,0,0]

                data.options.forEach((option: { value: string; }) => {
                    console.log(option)
                    options.push(option.value)
                })

                data.userAnswers.forEach((userAnswer: any) => {
                    const index = userAnswer.answer.index
                    if(index == 1){
                        dataSets[0] += 1
                    }else if(index == 2){
                        dataSets[1] += 1
                    }else if(index == 3){
                        dataSets[2] += 1
                    }else if(index == 4){
                        dataSets[3] += 1
                    }else if(index == 5){
                        dataSets[4] += 1
                    }else if(index == 6){
                        dataSets[5] += 1
                    }else if(index == 7){
                        dataSets[6] += 1
                    }else if(index == 8){
                        dataSets[7] += 1
                    }
                })

                console.log("OPTIONS: ", options)
                setLabels(options)

                console.log("DATASETS: ", dataSets)
                setDataSets(dataSets)


                // setLabels
                // setDataSets

                setTimeout(() => {
                    setQuestionResolve(true)
                }, 5000)
             
            })

            // listener
            socket.on('joinedRoom', (data) => {
                console.log("has joinedddd")
                console.log("NEW LEADERBOARD: ", data.leaderBoard)
                console.log(`${data.userId} ist dem Quiz ${params.id} beigetreten`)
                setParticipants(data.participants)
                setLeaderBoard(data.leaderBoard)
            });

            socket.on('leavedRoom', (data) => {
                console.log(`${data.userId} hat das Quiz ${params.id} verlassen.`)
                console.log("Teilnehmer: ", participants)
                setParticipants(data.participants)
            });

            socket.on('changedPage', (data)=> {
                setQuestionResolve(false)
                setResolveAnswers(false)
                setSecondsToAnswer(data.newQuiz.questions[data.newIndex].secondsToAnswer)
                setQuestionIndex(data.newIndex)
                console.log("Hat über Server seite geandert")
                console.log("index: ", data.newIndex)
                setUserAnswers(data.newQuiz.questions[data.newIndex].userAnswers)
                socket.emit("startTimer", {quizId: params.id, secondsToAnswer: quizData?.questions[data.newIndex]?.secondsToAnswer}) 
                // setUserAnswers(data.payload.questions[data.newIndex].userAnswers)
                // setUserAnswers(quizData?.questions[data.newIndex].userAnswers)
                // TODO: Wenn User weiter klickt, dann soll angezeigt werden wer eine Antwort abgegeben hat
            })

            socket.on('givedAnswer', (data) => {
                console.log(`${data.answer.userId} gibt die Antwort: `, data.answer)
                console.log("neue UserAnswers: ", data.userAnswers)
                setUserAnswers(data.userAnswers)
            })

            socket.on('endedQuiz', (data) => {
                navigate('hallOfFame')
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
        if(key === 'ArrowRight') socket.emit('changePage', {index: 1, oldIndex: questionIndex, quizId: params.id, quizLength: quizData?.questions.length })
        else if(key === 'ArrowLeft')   socket.emit('changePage', {index: -1, oldIndex: questionIndex, quizId: params.id, quizLength: quizData?.questions.length})
    };

    const getLetter = (num: number) => {
        let buchstabe = ''
        switch(num) {
            case 1:
                buchstabe = 'A'
                return buchstabe
            case 2:
                buchstabe = 'B'
                return buchstabe
            case 3:
                buchstabe = 'C'
                return buchstabe
            case 4:
                buchstabe = 'D'
                return buchstabe
            case 5:
                buchstabe = 'E'
                return buchstabe
            case 6:
                buchstabe = 'F'
                return buchstabe
            default:
            // code block

            return buchstabe
        }
    }


    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
  
    const endQuizAndNavigateToLeaderboardPage = () => {
        // Sende an DB, dass Quiz beendet ist mit variable quizIsEnded={true/false}
        console.log("ist beendet")
        socket.emit('endQuiz', {quizId: params.id})
        // Leite mich weiter auf ein Screen wo das leaderboard erscheint und eine Nachricht "Danke fürs mitmachen" oder so
        // Die Punkte aus dem Leaderboard sollen den Spielern gutgeschrieben werden auf ihr Haupt konto
    }

    return (
       <Box style={{marginLeft:'auto',marginRight:'auto', width: 1400}}>
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
                        <Box style={{height: 80, marginTop: 20}}>
                            <h3><b>{quizData?.questions[questionIndex]?.question} {questionIndex+1}/{quizData?.questions.length}</b></h3>
                            {secondsToAnswer === 0?<h3>Die Zeit zum antworten ist abgelaufen!</h3>:<h3>{secondsToAnswer} Sekunden zu antworten</h3>}
                        </Box>
                        <Box style={{height: 240, width:240, marginTop: 40}}>
                            <img src={aufgabenBild} width="240" height="240"/>
                        </Box>
                    </Box>
                    {questionIndex>0 ?  
                        questionResolve && <Button style={{width:200, marginTop: 135,height: 100, backgroundColor:'#e2001a'}}  variant="contained" onClick={() => socket.emit('changePage', {index: -1, oldIndex: questionIndex, quizId: params.id, quizLength: quizData?.questions.length})}><label style={{fontWeight:'bold', fontSize:16}}>Zurück</label></Button> 
                    : null}
                  
                </Grid>

                <Grid item xs={7} style={{}}>
                    {questionResolve ?  
                        <Box marginTop={14}> 
                            <GraphBar dataSets={dataSets} labels={labels}></GraphBar>
                        </Box>
                    :
                        <Box>
                            <Box style={{height:270}}>
                                <Grid container spacing={2} style={{marginLeft: 30, marginTop:60, width: 700}}>
                                    {quizData?.questions[questionIndex]?.options.map((option,i)=> {
                                        return (
                                            <Grid key={i} item xs={6} style={{marginTop:10, cursor:'pointer'}}>
                                                <Paper elevation={3} style={{height:60,borderRadius:10, display:'flex', justifyContent:'space-around', alignItems:'center', backgroundColor: option.isRightAnswer && resolveAnswers ?'green': !option.isRightAnswer && resolveAnswers ? 'lightgray':''}}>
                                                    <label style={{color:option.isRightAnswer && resolveAnswers ?'white':''}}><b>{getLetter(option.index)}:</b></label>
                                                    <p  style={{color:option.isRightAnswer && resolveAnswers ?'white':''}}>{option.value}</p>
                                                    <p></p>
                                                </Paper>
                                            </Grid>
                                        )
                                    })}

                                </Grid>
                            </Box>

                            <Box style={{marginLeft:40, marginTop:40,}}>
                                <h3>{userAnswers.length} von {participants.length} Usern haben geantwortet</h3>
                            </Box>
                        
                            <Grid container spacing={2} style={{width:700,marginLeft:40,marginTop:10}}>
                                {userAnswers.map(({answer,userId}, i) =>
                                    <Box key={i}>
                                        <Avatar sx={{ width: 60, height: 60 }} alt="Remy Sharp" src={catAvatar} />
                                        <label style={{ marginLeft: 6}}><b>{userId}</b></label>
                                    </Box>
                                )}
                            </Grid>
                        </Box>
                    }
                </Grid>

                <Grid style={{}} item xs={2.4}>
                    <Box style={{width: 240, float:'right'}}>
                        <p onClick={handleOpen}><b>Leaderboard anzeigen</b></p>
                        <label>{participants.length} Teilnehmer <label style={{color:'green'}}>aktiv</label> </label>
                        <p>Um beizutreten nutze den Code <b>{quizData?.quizId}</b> oder Scanne mich!</p>
                        <Box style={{height: 200, width:200, marginTop: 40}}>
                            <img src={qrCode} width="200" height="200"/>
                        </Box>
                        {questionIndex+1 === quizData?.questions.length?  
                            <Button 
                                style={{
                                    width:200, 
                                    marginTop: 155,
                                    height: 100, 
                                    backgroundColor:'#e2001a'
                                }}  
                                variant="contained" 
                                onClick={endQuizAndNavigateToLeaderboardPage}>
                                <label style={{fontWeight:'bold', fontSize:16}}>
                                    Quiz beenden
                                </label>
                            </Button>  
                        :  

                        questionResolve &&
                            <Button 
                                style={{
                                    width:200, 
                                    marginTop: 155,
                                    height: 100, 
                                    backgroundColor:'#e2001a'
                                }}  
                                variant="contained" 
                                onClick={() =>  socket.emit('changePage', {index: 1, oldIndex: questionIndex, quizId: params.id, quizLength: quizData?.questions.length})}>
                                <label style={{fontWeight:'bold', fontSize:16}}>
                                    weiter
                                </label>
                            </Button> 
                        }
                          
                            

                        
                    </Box>
                </Grid>
            </Grid>


                <div>

      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={leaderBoardStyle}>
            <Box textAlign={'center'} height={40} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <GiTrophy color={'gold'} size={30}/>
                <h2>Leaderboard</h2>
                <GiTrophy color={'gold'} size={30} />
            </Box>
            <Box marginTop={4}>
            {leaderBoard.length === 0 && <label>Es ist noch niemand im Quiz</label>}    
            {leaderBoard.map(user => {
                    return <Box display={'flex'}  justifyContent={'space-between'} marginTop={2}>
                        <label>{user.userId}</label>
                        <label>{user.points}</label>
                    </Box>
                })}
            </Box>
        </Box>
      </Modal>
    </div>
        </Box>
        
    );
}

const leaderBoardStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
  };