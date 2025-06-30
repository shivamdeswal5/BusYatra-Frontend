import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState: any = {
    loading: false,
    error: null,
    message: null,
    bus: null,
    user: null,
};


export const fetchBuses = createAsyncThunk(
    "bus/fetchBuses",
    async (
        userId: string,
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/users/${userId}`,
                { withCredentials: true }
            );
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Unable to fetch Buses");
        }
    }
);


export const fetchBusDetails = createAsyncThunk(
    "bus/fetchBusDetails",
    async (
        busId: string,
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/bus/${busId}`,
                { withCredentials: true }
            );
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Unable to fetch Buses");
        }
    }
);


const busSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthState(state) {
            state.error = null;
            state.message = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchBuses.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(fetchBuses.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.user = action.payload;
            })
            .addCase(fetchBuses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // bus details

            .addCase(fetchBusDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(fetchBusDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.bus = action.payload;
            })
            .addCase(fetchBusDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

    },
});

export const { clearAuthState } = busSlice.actions;
export default busSlice.reducer;
