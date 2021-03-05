import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../lib/slices/auth'
import { ThunkDispatch } from '../lib/store'

import Button from './Button'

export const Header: React.FC = ({ children }) => {
  const router = useRouter()
  const dispatch: ThunkDispatch = useDispatch()

  return (
    <div>
      <Button
        className="bg-primary absolute rounded-xl p-2 text-white shadow-xl-light left-4 top-4"
        onClick={async () => {
          await dispatch(logout())
          router.push('/login')
        }}>
        Logout
      </Button>
      {children}
    </div>
  )
}
