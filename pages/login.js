import Head from 'next/head'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import styles from '../styles/Home.module.css'

export default function Login() {
    
    const [email, setEmail] = useState("")
    const [emailSent, setEmailSent] = useState(false)
    const [error, setError] = useState(null)
    
    const router = useRouter();
    const { authUser, loading, signUp, confirmSignIn } = useAuth();
  
    // Listen for changes on loading and authUser, redirect if needed
    useEffect(() => {
      confirmSignIn(window.location.href)
    }, [confirmSignIn])

    useEffect(() => {
      if (!loading && authUser)
        router.push('/profile')
    }, [authUser, loading, router])
  
    const loginWithEmail = event => {
      setError(null)
      
      signUp(email)
      .then(authUser => {
        setEmailSent(true)
      })
      .catch(error => {
        // An error occurred. Set error message to be displayed to user
        setError(error.message)
      });
      event.preventDefault();
    };

    return (
      <div className={styles.container}>
        <Head>
          <title>GnG Auth App - Login</title>
          <meta name="description" content="Login page for GnG Auth App" />
        </Head>

        <main className={styles.main}>
          <h3 className={styles.title}>
              Login
          </h3>
          {emailSent && 
            <div>
              <p>Please verify your email address by clicking the link we sent* and follow the instructions on your broswer to finish signing up. </p>
    
              <p> *It may take a few minutes for you to recieve the email. Please check spam folder if you don&apos;t see it in your inbox. </p>
            </div>
          }
          {!emailSent &&
            <form onSubmit={loginWithEmail} className={styles.card}>
              {/* <div> 
                <label for="name">Name</label>
                <input type="text"/>
              </div> */}

              <div> 
                <label htmlFor="email">Email</label>
                <input 
                  id="email" 
                  type="text" 
                  required
                  onChange={(event) => setEmail(event.target.value)} />
              </div>

              <div>
                <button type="submit"> Login </button>
              </div>
            </form>
          }
        </main>
      </div>
    )
}