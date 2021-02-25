import { useRouter } from 'next/dist/client/router'
import React from 'react'

import Button from './Button'

export const Header: React.FC = ({ children }) => {
  const router = useRouter()
  return (
    <div>
      <Button
        className="bg-primary absolute rounded-xl p-2 text-white shadow-xl-light left-4 top-4"
        onClick={() => {
          router.push('/login')
        }}>
        Login
      </Button>
      {children}
    </div>
  )
}
