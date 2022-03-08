import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../context/AuthUserContext';

export default function SignUp() {

  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState(null)

  const router = useRouter()
  const { signUp } = useAuth();
  
  const signUpUserWithEmail = event => {
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
        <title>GnG Auth App - Sign up</title>
        <meta name="description" content="Sign up page for GnG Auth App" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>
            Sign Up
        </h3>

        {emailSent && 
          <div>
            <p>Please verify your email address by clicking the link we sent* and follow the instructions on your broswer to finish signing up. </p>
  
            <p> *It may take a few minutes for you to recieve the email. Please check spam folder if you don&apos;t see it in your inbox. </p>
          </div>
        }
        {!emailSent && 
          <form onSubmit={signUpUserWithEmail} className={styles.card}>
            <div> 
              <p>Easy Account Creation</p> {' '}
              <ul>
                <li>Enter your email address</li> {' '}
                <li>Verify your email address</li> {' '}
                <li>Fill the sign up form. Done!</li> {' '}
              </ul>
            </div>
      
            <div> 
              <label htmlFor="email">Email</label>
              <input 
                id="email" 
                type="text" 
                required
                onChange={(event) => setEmail(event.target.value)} />
            </div>

            <div>
              <button type="submit"> Sign Up </button>
            </div>
          </form>
        }
      </main>
    </div>
  )
  }