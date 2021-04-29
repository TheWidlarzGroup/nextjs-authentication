import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../axios'

export enum FrogStates {
  IDLE = 'idle',
  LOADING = 'loading',
}

export const fetchFrogs = createAsyncThunk('auth/frogs', async (_, thunkAPI) => {
  try {
    const response = await axios.get<{ hits: any[] }>('api/frogs')
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

const internalInitialState = {
  loading: FrogStates.IDLE,
  frogs: [],
  error: null,
}

export const frogsSlice = createSlice({
  name: 'frogs',
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFrogs.fulfilled, (state, action) => {
      state.frogs = [...action.payload.hits]
      state.loading = FrogStates.IDLE
    })
    builder.addCase(fetchFrogs.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error }
      throw new Error(action.error.message)
    })
    builder.addCase(fetchFrogs.pending, (state) => {
      state.loading = FrogStates.LOADING
    })
  },
})

export const { reset } = frogsSlice.actions
