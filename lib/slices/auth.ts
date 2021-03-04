import { createSlice, SerializedError } from '@reduxjs/toolkit'

export enum AuthStates {
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
  accessToken: '',
  loading: AuthStates.IDLE,
  me: {},
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
})

export const { reset } = authSlice.actions
