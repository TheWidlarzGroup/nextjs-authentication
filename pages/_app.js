import '../styles/styles.css'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Provider } from 'react-redux'
import { wrapper, store } from '../lib/store'
import { Header } from '../components/Header'

export const PageWrapper = styled.main`
  ${tw`text-near-black bg-ice-blue w-full relative`}
  min-height: 100vh;
`

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PageWrapper>
        <Header>
          <Component {...pageProps} />
        </Header>
      </PageWrapper>
    </Provider>
  )
}

export default wrapper.withRedux(MyApp)
