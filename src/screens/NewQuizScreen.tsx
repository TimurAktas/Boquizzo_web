import * as React from 'react'
import Button from '@mui/material/Button';
import { Box, Card, CardActionArea, CardActions, CardContent, CardMedia, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, styled, TextField, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft,FiBarChart2, FiPlus } from "react-icons/fi";
import { FaChartBar } from "react-icons/fa";

import { SelectChangeEvent } from '@mui/material/Select';

export const NewQuizScreen: React.FC = () => {
    const navigate = useNavigate()
    const [quizType, setQuizType] = React.useState('Multiple Choice')
    const [question, setQuestion ] = React.useState('')
    const [secondsToAnswer, setSecondsToAnswer] = React.useState(20)
    const [selectedImage, setSelectedImage] = React.useState(null)
    const [options, setOptions] = React.useState([
        {index: 1 ,value:'', isRightAnswer:false},
    ])

    const onChangeType = (event: SelectChangeEvent) => {
        setQuizType(event.target.value as string)
    };

    const onChangeQuestion = (event:any) => {
        setQuestion(event.target.value)
    }

    const onChangeSecondsToAnswer = (event:any) => {
        setSecondsToAnswer(event.target.value)
    }

    // ✅ Add an object to a state array
    const addOption = () => {
        let newOption = {
            index: options.length+1,
            value:'', 
            isRightAnswer:false
        }
        setOptions(current => [...current,newOption])
    }

     // ✅ Update value from Options
    const changeOptionValue = (event:any,i: number) => {
        setOptions(current => 
            current.map(option => {
                if(option.index === i+1){
                    return {...option, value: event.target.value};
                }
                return option; 
            }),
        );
    };

    // ✅ Update checkBox from Options
    const changeOptionCheckbox = (event:any,i: number) => {
        setOptions(current => 
            current.map(option => {
                if(option.index === i+1){
                    return {...option, isRightAnswer: !option.isRightAnswer};
                }
                return option; 
            }),
        );
    };

     // ✅ Remove one or more objects from state array
    const removeOption = (index:number) => {
        setOptions(current =>
            current.filter(option => {
                return option.index !== index;
            }),
        );
        
        setOptions(current => 
            current.map(option=> {
                if(option.index > index){
                    return {...option, index: option.index-1};
                }else{
                    return {...option}
                }
                
            }),
        );
    };

    const addQuestionToQuiz = () => {
        const quizQuestion = {
            type: quizType,
            question: question,
            secondsToAnswer: secondsToAnswer,
            selectImage: selectedImage,
            options: options,
        }

        console.log(quizQuestion)
    }

    const selectQuestion = (quizQ:any) => {
        console.log(quizQ)
        setQuizType(quizQ.type)
        setQuestion(quizQ.question)
        setSecondsToAnswer(quizQ.secondsToAnswer)
        setOptions(quizQ.options)
    }

    const newQuizQuestion = () => {
        setQuizType('Multiple Choice')
        setQuestion('')
        setSecondsToAnswer(20)
        setOptions([{index: 1 ,value:'', isRightAnswer:false},])
    }

    return (
        <Box style={{marginLeft:100,marginRight:100, marginTop:40, minWidth: 700}}>        
            <Box style={{display: 'flex'}}>
                <Box  style={{display: 'flex', alignItems:'center',cursor:'pointer'}}onClick={() => navigate(-1)}>
                    <FiArrowLeft size={34}/>
                    <label style={{fontSize:16,cursor:'pointer'}}>Neues Quiz erstellen</label>
                </Box>
            </Box>

            <Grid container spacing={2} style={{marginTop:10, minWidth:1150}} >

                <Grid item xs={6} style={{minWidth:500,height: 650,overflowY:'scroll'}}>
                    <Box>
                        <h3 style={{marginTop:10}}> Dein Quizzie besteht aus {FakeData.length} Fragen </h3>
                        <Button style={{width:'44%'}}  variant="contained">Quiz Starten</Button>
                    </Box>

                    <Grid container spacing={2} marginTop={2} marginLeft={-1}>
                    {FakeData.map((quizQ,i) => {
                        return <Card key={i} sx={{margin: 1, borderWidth:0.5, borderStyle:'solid'}} onClick={() => selectQuestion(quizQ)}>
                                <CardActionArea sx={{ width: 240,height: 100}}>
                                    <CardContent>
                                        <Box style={{justifyContent:'center', display:'flex', marginBottom:10}}>
                                            <FiBarChart2 size={34}/>
                                        </Box>
                                        <Box style={{justifyContent:'center', display:'flex', marginBottom:10}}>
                                            <Typography variant="body2" color="text.secondary">
                                                {quizQ.question}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                    })}

                        <Card sx={{margin: 1, backgroundColor:'lightgray'}} onClick={newQuizQuestion}>
                            <CardActionArea sx={{ width: 240,height: 100}}>
                                <CardContent>
                                    <Box style={{justifyContent:'center', display:'flex', marginBottom:10}}>
                                        <FiPlus size={34}/>
                                    </Box>
                                    <Box style={{justifyContent:'center', display:'flex', marginBottom:10}}>
                                        <Typography variant="body2" color="text.secondary">
                                            weitere Frage stellen
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>

            <Grid item xs={6} style={{display: 'flex', justifyContent: 'flex-end',}}>
                <Paper elevation={3} style={{padding:20, paddingTop:2, margin: 10, width:500, height:600, overflowY:'scroll',}}>
                    <Box>
                        <h4>Deine Frage</h4>
                        <TextField style={{fontSize:10}} id="standard-basic"  value={question} onChange={onChangeQuestion}  label="Stell eine Quiz frage" variant="outlined" size='small' fullWidth/>

                        <h4>Optionen (max 6)</h4>
                        <Box>
                            {options && options.map((option,i) => {
                                return <Box key={i} style={{display: 'flex',  alignItems:'center',justifyContent:'space-between', paddingRight:20, marginBottom:10}}>
                                    <Box>
                                        <Checkbox checked={option.isRightAnswer} onChange={event => changeOptionCheckbox(event,i)}/>
                                        <TextField size='small' style={{width:300}} id="standard-basic" label={'option '+(i+1)} value={option?.value} onChange={event => changeOptionValue(event,i)}  variant="outlined" />
                                    </Box>
                                    <label style={{color:'red', justifySelf:'flex-end',cursor:'pointer'}} onClick={() => removeOption(i+1)}>entfernen</label>
                                </Box>
                            })}
                            {options.length === 6? null :  <Button variant="outlined" style={{marginTop:10}} fullWidth onClick={addOption}>+ weitere Option hinzufügen</Button>}   
                        </Box>
                        

                        <h4>Bild Hochladen</h4>
                        <div>
                            {selectedImage && (
                                <div>
                                    <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                                    <br />
                                    <button onClick={()=>setSelectedImage(null)}>Remove</button>
                                </div>
                            )}

                            <input
                                type="file"
                                name="myImage"
                                onChange={event => {
                                    console.log(event.target.files?.[0]);
                                    //setSelectedImage(event.target.files[0]);
                                }}
                            />
                        </div>
                        
                        
                        <h4>Art der Quizfrage</h4>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Art</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={quizType}
                                    label="Age"
                                    size='small'
                                    onChange={onChangeType}
                                >
                                    <MenuItem value={'Multiple Choice'}>Multiple Choice</MenuItem>
                                    <MenuItem value={'Single Choice'}>Single Choice</MenuItem>
                                    <MenuItem value={'Abstimmung'}>Abstimmung</MenuItem>
                                </Select>
                        </FormControl>


                        <h4>Extras</h4>
                        <Box style={{display: 'flex',  alignItems:'center',justifyContent:'space-between'}}>
                            <TextField type={'number'} size="small" style={{width:140, }}  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}  id="standard-basic" label="" value={secondsToAnswer} onChange={onChangeSecondsToAnswer}  variant="outlined" />
                            <label style={{fontSize:16}}>Sekunden zu antworen</label>
                        </Box>

                        <Box style={{display: 'flex', marginTop:20, alignItems:'center',justifyContent:'space-between'}}>
                            <Button style={{ width:'44%'}} color='error' variant="contained" onClick={() => console.log("dasd")}>Löschen</Button>
                            <Button style={{width:'44%'}}  variant="contained" onClick={addQuestionToQuiz}>Hinzufügen</Button>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    </Box>
    );
}


const FakeData = [
    {
        type: 'Single Choice',
        question: 'Können Hühner fliegen?',
        secondsToAnswer: 20,
        selectImage: 'Image.png',
        options: [
            {index: 1 ,value:'Nein', isRightAnswer:true},
            {index: 2 ,value:'Jaa', isRightAnswer:false},
            {index: 3 ,value:'Weiß nicht', isRightAnswer:false},
        ]
    },
    {
        type: 'Multiple Choice',
        question: 'Können Hühner fliegen?',
        secondsToAnswer: 20,
        selectImage: 'Image.png',
        options: [
            {index: 1 ,value:'Nein', isRightAnswer:true},
            {index: 2 ,value:'Jaa', isRightAnswer:false},
            {index: 3 ,value:'Weiß nicht', isRightAnswer:false},
        ]
    },
    {
        type: 'Abstimmung',
        question: 'Werde ich das hier bestehen ya salame?',
        secondsToAnswer: 20,
        selectImage: 'Image.png',
        options: [
            {index: 1 ,value:'Nein', isRightAnswer:true},
            {index: 2 ,value:'Jaa', isRightAnswer:false},
            {index: 3 ,value:'Weiß nicht', isRightAnswer:false},
            {index: 3 ,value:'Niemals', isRightAnswer:false},
            {index: 3 ,value:'Maul alda', isRightAnswer:false},
        ]
    },
    {
        type: 'Multiple Choice',
        question: 'Waren wir auf dem Mond?',
        secondsToAnswer: 30,
        selectImage: 'Image.png',
        options: [
            {index: 1 ,value:'Nein', isRightAnswer:true},
            {index: 2 ,value:'Jaa', isRightAnswer:false},
        ]
    },
]