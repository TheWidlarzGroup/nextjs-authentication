import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/dist/client/router'
import { fetchFrogs } from '../lib/slices/frogs'
import { MyThunkDispatch } from '../lib/store'
import { user } from '../lib/authorize'
import Button from '../components/Button'

// Dynamicaly import the AuthGuard component.
const AuthGuard = dynamic<{ readonly customText: React.ReactNode }>(() =>
  import('../components/AuthGuard').then((mod) => mod.AuthGuard)
)

type Frog = { id: string; webformatURL: string }

export const Home = ({ frogs }: { frogs: Frog[] }) => {
  const router = useRouter()
  return (
    <AuthGuard
      // Our custom message to unauthorized users.
      customText={
        <p className="text-72 mb-24">
          <span
            className="text-primary underline cursor-pointer"
            onClick={() => router.push('/login')}>
            Login
          </span>
          to pet the phrog 👀
        </p>
      }>
      <div className="flex flex-col items-center">
        <Button
          className="mt-10"
          onClick={() => {
            router.push('/login')
          }}>
          Go to login ↖️
        </Button>
        <p className="text-72 mb-24 text-center">You may pet the phrog 🐸</p>
        {frogs?.map((frog, index) => (
          <div key={index} className="mb-4">
            <Image src={frog.webformatURL} width={700} height={500} className="rounded-xl" />
          </div>
        ))}
      </div>
    </AuthGuard>
  )
}

export const getServerSideProps = user({
  callback: async (_, store) => {
    const { dispatch }: { dispatch: MyThunkDispatch } = store
    await dispatch(fetchFrogs())

    return {
      props: {
        frogs: store.getState().frogsReducer.frogs,
      },
    }
  },
})

export default Home
