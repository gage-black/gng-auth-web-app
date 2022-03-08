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
    <div className="container vh-100 d-flex align-item-center">
      <Head>
        <title>GnG Auth App - Sign up</title>
        <meta name="description" content="Sign up page for GnG Auth App" />
      </Head>

      <main className="w-100 my-auto">
        <div className="container mt-3">
          <div className="row">
              <form onSubmit={signUpUserWithEmail} className="card"> 
                <div className="card-body">   
                  <h3 className="card-title">Sign Up</h3>
                  <div> 
                    <p>Easy Account Creation</p> {' '}
                    <ol>
                      <li>Enter your email address</li> {' '}
                      <li>Verify your email address</li> {' '}
                      <li>Fill the sign up form. Done!</li> {' '}
                    </ol>
                  </div>
                  
                  {emailSent && 
                    <div>
                      <p>Please verify your email address by clicking the link we sent* and follow the instructions on your broswer to finish signing up. </p>
            
                      <p className="fst-italic fs-6"> *It may take a few minutes for you to recieve the email. Please check spam folder if you don&apos;t see it in your inbox. </p>
                    </div>
                  }
                  {!emailSent &&
                      <div>
                        <div className="mb-3"> 
                          <label htmlFor="email" className="form-label">Email</label>
                          <input 
                            className="form-control"
                            id="email" 
                            type="text" 
                            required
                            onChange={(event) => setEmail(event.target.value)} />
                        </div>
          
                        <div>
                          <button type="submit" className="btn btn-primary"> Sign Up </button>
                        </div>
                      </div>
                  }
                </div>
              </form>
          </div>
        </div>
      </main>
    </div>
  )
  }