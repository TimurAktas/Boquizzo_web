import { createSlice } from '@reduxjs/toolkit';
import { connectSocket, joinQuizRoom } from './socket.action';
import { SocketState } from './socket.types';

const initialState: SocketState = {
    data: undefined,
    loading: false,
    error: null,
};

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(connectSocket.fulfilled, (state, action) => {
            state.data = action.payload;
        });

    },
});