import { createSlice } from '@reduxjs/toolkit';
import { connectSocket } from './socket.action';
import { SocketState } from './socket.types';

const initialState: SocketState = {
    data: false,
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