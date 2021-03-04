import { AnyAction, Store } from '@reduxjs/toolkit'
import { ServerResponse } from 'http'
import { GetServerSidePropsContext } from 'next'
import * as setCookie from 'set-cookie-parser'
import * as cookie from 'cookie'
import axios from './axios'
import { fetchUser, reset, updateAccessToken } from './slices/auth'
import { OurStore, ThunkDispatch, wrapper } from './store'

export type ContextWithStore = Omit<
  GetServerSidePropsContext & {
    store: Store<OurStore, AnyAction>
  },
  'resolvedUrl'
>

export type Callback = (
  accessToken: string,
  store: Store<any, AnyAction>,
  res: ServerResponse
) => void | Promise<void>

interface AuthorizeProps {
  context: ContextWithStore
  callback: Callback
}

const authorize = async ({ context, callback }: AuthorizeProps) => {
  const { store, req, res } = context
  const { dispatch }: { dispatch: ThunkDispatch } = store

  await dispatch(fetchUser())
  let accessToken = store.getState()?.authReducer?.accessToken ?? ''
}

interface UserProps {
  callback: Callback
}

export const user = ({ callback }: UserProps) =>
  wrapper.getServerSideProps(async (context) => {
    try {
      const { dispatch }: { dispatch: ThunkDispatch } = context.store
      await dispatch(fetchUser())
      await authorize({ context, callback })
    } catch (error) {
      throw new Error(error)
    }
  })
