import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { socket } from '../redux/utils/socket';
import { getQuizData } from '../redux/quiz/quiz.action';
import { Avatar, Box, CircularProgress, Container, Grid, Paper, TextField } from '@mui/material';
import { LeaderBoardType } from '../redux/quiz/quiz.types';
import { GiTrophy } from 'react-icons/gi';

export const HallOfFameScreen: React.FC = ({}) => {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch();
    const params = useParams();

    const firstplace = require('../assets/firstplace.png');
    const secondplace = require('../assets/secondplace.png');
    const thirdplace = require('../assets/thirdplace.png');


    const [leaderBoard, setLeaderBoard] = React.useState<LeaderBoardType[]>([])
    
    React.useEffect(() => {
        if(params.id) {
            dispatch(getQuizData(params.id)).then((data) => {
                setLeaderBoard(data.payload.leaderboard)

                console.log("Leaderboard: ", data.payload.leaderboard)

                socket.emit('awardUsers', {quizId: params.id, leaderboard: data.payload.leaderboard})
            })
        }

    },[])

    return (
        <Box style={{marginLeft:100,marginRight:100, marginTop:40, minWidth: 700}}>       
            <Box style={{display: 'flex'}}>
                <Box  style={{display: 'flex', alignItems:'center',cursor:'pointer'}}onClick={() => navigate('/')}>
                    <FiArrowLeft size={34}/>
                    <label style={{fontSize:16,cursor:'pointer'}}>Zurück zum Hauptbildschirm</label>
                </Box>
            </Box>

            <h2 style={{marginLeft:'auto', marginRight:'auto', width: 775}}>Sie haben das ende der Präsentation erreicht. Danke fürs mitmachen!</h2>


            <Box style={{marginBottom: 100 ,marginTop: 60, marginLeft:'auto', marginRight:'auto',width: 600, padding: 20, boxShadow: '-1px 5px 12px rgba(0, 0, 0, 0.2)', WebkitBoxShadow: ' -1px 5px 12px rgba(0, 0, 0, 0.2)', MozBoxShadow:'-1px 5px 12px rgba(0, 0, 0, 0.2) ', borderRadius: 20}}>
                <h2 style={{color:'black', marginLeft:'auto', marginRight:'auto',width: 145}}>Hall Of Fame</h2>
                <Box style={{width: '100%', height: .5, backgroundColor:'black', marginLeft:'auto', marginRight:'auto' }}></Box>
                {leaderBoard.length === 0 && <label>Es ist noch niemand im Quiz</label>}    
                {leaderBoard?.map((user,index) => {
                        if(index <= 2){
                            if(index == 0){
                            return <Box style={{display:'flex', width:'100%', justifyContent:'space-between', alignItems:'center', marginTop: 20}}>
                                <img src={firstplace} width="60" height="60"/>
                                <label>{user.userId}</label>
                                <label>{user.points}</label>
                            </Box>
                        }else if(index == 1){
                            return <Box style={{display:'flex', width:'100%', justifyContent:'space-between', alignItems:'center', marginTop: 20}}>
                                <img src={secondplace} width="60" height="60"/>
                                <label>{user.userId}</label>
                                <label>{user.points}</label>
                            </Box>
                        }else{
                            return <Box style={{display:'flex', width:'100%', justifyContent:'space-between', alignItems:'center', marginTop: 20}}>
                                <img src={thirdplace} width="60" height="60"/>
                                <label>{user.userId}</label>
                                <label>{user.points}</label>
                            </Box>
                        }
                        }else{
                        return <Box style={{display:'flex', width:'100%', justifyContent:'space-between', alignItems:'center', marginTop: 20}}>
                            <Box style={{width:40, marginLeft:10, display:'flex', justifyContent:'center'}}>
                                <label style={{fontWeight:'bold'}}>{index+1}. </label>
                            </Box>
                            <label>{user.userId}</label>
                            <label>{user.points}</label>
                        </Box>
                        }
                    })}
            </Box>

        </Box>
    );
}