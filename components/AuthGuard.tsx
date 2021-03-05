import React from 'react'
import { useSelector } from 'react-redux'
import { OurStore } from '../lib/store'

type Props = {
  readonly role?: 'admin'
  readonly customText?: string
}

export const AuthGuard: React.FC<Props> = ({ children, role, customText }) => {
  const { loading, me } = useSelector((state: OurStore) => state.authReducer)

  if (loading) {
    return <>loading...</>
  }

  // Without role allow all authorized users
  if (me) {
    return <>{children}</>
  }

  if (role === 'admin' && me?.role === 'ADMIN') {
    return <>{children}</>
  }

  return (
    <section>
      <h2>Unauthorized</h2>
      <p>
        {customText ||
          "You don't have permission to access this page. Pleae contact an admin if you think something is wrong."}
      </p>
    </section>
  )
}
