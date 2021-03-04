import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import axios from '../axios'

export enum AuthStates {
  IDLE = 'idle',
  LOADING = 'loading',
}

export const fetchUser = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  try {
    const response = await axios.get<{ name: string; email: string; type: string }>('api/me')

    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post<{ accessToken: string }>('api/login', credentials)
      const refetch = await axios.get<{ name: string }>('api/me', {
        headers: { Authorization: `Bearer ${response.data.accessToken}` },
      })
      return { accessToken: response.data.accessToken, me: { name: refetch.data.name } }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)
export const register = createAsyncThunk(
  'auth/register',
  async (credentials: { email: string; password: string; name: string }, thunkAPI) => {
    try {
      const response = await axios.post<{ accessToken: string }>('api/register', credentials)
      const refetch = await axios.get<{ name: string }>('api/me', {
        headers: { Authorization: `Bearer ${response.data.accessToken}` },
      })
      return { accessToken: response.data.accessToken, me: { name: refetch.data.name } }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.delete<{ accessToken: string }>('api/logout')
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export interface AuthSliceState {
  accessToken: string
  loading: string
  me: Record<string, unknown>
  error?: SerializedError
}

const internalInitialState = {
  accessToken: '',
  loading: AuthStates.IDLE,
  me: {},
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: internalInitialState,
  reducers: {
    updateAccessToken(state: AuthSliceState, action: PayloadAction<{ token: string }>) {
      state.accessToken = action.payload.token
    },
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken
      state.me = action.payload.me
      state.loading = AuthStates.IDLE
    })
    builder.addCase(login.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error }
      throw new Error(action.error.message)
    })
    builder.addCase(logout.pending, (state) => {
      state.loading = AuthStates.LOADING
    })
    builder.addCase(logout.fulfilled, (_state) => internalInitialState)
    builder.addCase(login.pending, (state) => {
      state.loading = AuthStates.LOADING
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken
      state.me = action.payload.me
      state.loading = AuthStates.IDLE
    })
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.error
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error }
      throw new Error(action.error.message)
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.me = action.payload
    })
  },
})

export const { updateAccessToken, reset } = authSlice.actions
