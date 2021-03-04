import { createSlice, SerializedError } from '@reduxjs/toolkit'

export enum FrogStates {
  IDLE = 'idle',
  LOADING = 'loading',
}

export interface AuthSliceState {
  accessToken: string
  loading: string
  me: Record<string, unknown>
  error?: SerializedError
}

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
  extraReducers: (builder) => {},
})

export const { reset } = frogsSlice.actions
