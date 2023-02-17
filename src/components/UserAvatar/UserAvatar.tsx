import { Avatar, Box } from "@mui/material";
import { GetUserNickname } from "../../redux/utils/utils";

export type UserAvatarType = {
    key: number,
    userId: string,
};
export const UserAvatar: React.FC<UserAvatarType> = (data) => {
    const catAvatar = require('../../assets/illustration/catAvatar.jpg');
    return (
        <Box key={data.key} style={{marginRight:40, marginTop:10, justifyContent:'center', alignItems:'center'}}>
            <Avatar sx={{ width: 40, height: 40, marginLeft:'auto', marginRight:'auto'}} alt="Remy Sharp" src={catAvatar} />
            <GetUserNickname userId={data.userId} />
        </Box>
      );
};
