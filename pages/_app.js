import { AuthUserProvider } from '../context/AuthUserContext'
import 'bootstrap/dist/css/bootstrap.css'; // Add this line

function MyApp({ Component, pageProps }) {
  return <AuthUserProvider><Component {...pageProps} /></AuthUserProvider>
}

export default MyApp
