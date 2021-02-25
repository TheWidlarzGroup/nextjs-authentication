import { useRouter } from 'next/dist/client/router'
import axios from 'axios'
import Image from 'next/image'

type Frog = { id: string; webformatURL: string }

export const Home = ({ frogs }: { frogs: Frog[] }) => {
  const router = useRouter()
  return (
    <div>
      <div className="flex flex-col items-center">
        <p className="text-72 mb-24">
          {frogs ? (
            'You may pet the phrog 🐸'
          ) : (
            <>
              <span
                className="text-primary underline cursor-pointer"
                onClick={() => router.push('/login')}>
                Login
              </span>{' '}
              to pet the phrog 👀
            </>
          )}
        </p>
        {frogs?.map((frog, index) => (
          <div key={index} className="mb-4">
            <Image src={frog.webformatURL} width={700} height={500} className="rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const response = await axios.get(
    'https://pixabay.com/api/?key=20330556-9d467084be89e92c1e9632c3a&q=frog&image_type=photo'
  )

  return { props: { frogs: response.data.hits } }
}

export default Home
