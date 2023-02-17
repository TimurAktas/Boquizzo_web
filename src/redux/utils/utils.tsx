import React from "react";
import { useEffect } from "react";
import { API_URL } from "../../config/config";

export type nickNameProps = {
    userId: string;
};

export const GetUserNickname: React.FC<nickNameProps> = ({userId}) => {
    const [nickName, setNickName] = React.useState(userId)

    useEffect(() => {
        const getNickName = async () => {
            try{
                const response = await fetch(`${API_URL}/users/${userId}`);
                const json = await response.json();
                setNickName(json.nickname)
            }
            catch(error: any){
                console.warn('Error in getUserNickname', error.response)
                setNickName(userId) 
            }

        }
        getNickName()
    },[userId])

    return(<label>{nickName}</label>)
}


