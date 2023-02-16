import { Avatar, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { API_URL } from "../../config/config";

export type UserAvatarType = {
    key: number,
    userId: string,
};

export const UserAvatar: React.FC<UserAvatarType> = (data) => {
    const catAvatar = require('../../assets/illustration/catAvatar.jpg');
    const [nickname, setNickname] = useState(null)

    useEffect(() => {
        console.log("Get User With ID: ", data.userId)
        getUserFromDB()
    },[])

    const getUserFromDB = async () => {
        console.log(data)
        const response = await fetch(`${API_URL}/users/`+ data.userId);
        const json = await response.json();
        setNickname(json.nickname)
    }

    return (
        <Box key={data.key} style={{marginRight:5, justifyContent:'center', alignItems:'center'}}>
            <Avatar sx={{ width: 40, height: 40, marginLeft:'auto', marginRight:'auto'}} alt="Remy Sharp" src={catAvatar} />
            {nickname ? <label style={{color:'black', fontWeight:'bold'}}>{nickname}</label>:<label>{data.userId}</label>}
        </Box>
      );
};
