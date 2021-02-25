import '../styles/styles.css'
import styled from 'styled-components'
import tw from 'twin.macro'

export const PageWrapper = styled.main`
  ${tw`text-near-black bg-ice-blue w-full relative`}
  min-height: 100vh;
`

function MyApp({ Component, pageProps }) {
  return (
    <PageWrapper>
      <Component {...pageProps} />
    </PageWrapper>
  )
}

export default MyApp
