import '../styles/globals.css'
import {Web3ReactProvider} from "@web3-react/core"
import { Web3Provider} from "@ethersproject/providers"

const getLibrary = (provider) => {
  // this is how you define how to get different providers with web3-react
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}

export default MyApp
