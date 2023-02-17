import { Box } from "@mui/material";
import { FiAlertTriangle } from "react-icons/fi";

export type ErrorBarType = {
    errorMessage: string,
};

export const Errorbar: React.FC<ErrorBarType> = ({errorMessage}) => {
    if(errorMessage === '') return null
    return (
        <Box style={{backgroundColor:'#F75D59', height: 30,display: 'flex', alignItems:'center', marginTop: 10, borderRadius:8, maxWidth: 500}}>
            <p style={{marginLeft: 8}}></p>
            <FiAlertTriangle size={18} color={'white'}/>
            <p style={{color:'white', marginLeft: 8}}>{errorMessage}</p>
        </Box>
    )
};
