import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserData {
  userId? : string,
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface UserI {
  userId : string,
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AuthState {
  loading: boolean;
  error: string | null;
  message: string | null;
  user: UserI;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  message: null,
  user: {
    userId:'',
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  },
  isAuthenticated: false,

};

// Signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/signup",
        userData
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password, otp }: { email: string; password: string; otp?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        { email, password, otp },
        { withCredentials: true }
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// Request OTP
export const requestOtp = createAsyncThunk(
  "auth/requestOtp",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/request-otp",
        { email }
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "OTP request failed"
      );
    }
  }
);

// logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/logout",
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Logout failed");
    }
  }
);

const authSlice = createSlice({
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
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Request OTP
      .addCase(requestOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(requestOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(requestOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = {
          userId: '',
          firstName: '',
          lastName: '',
          email: '',
          role: ''
        }
        state.isAuthenticated = false;
        state.message = "Logged out successfully";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
