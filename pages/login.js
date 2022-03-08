import Head from 'next/head'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
export default function Login() {
    
    const [email, setEmail] = useState("")
    const [emailSent, setEmailSent] = useState(false)
    const [error, setError] = useState(null)
    
    const router = useRouter();
    const { authUser, loading, signUp } = useAuth();

    useEffect(() => {
      if (!loading && authUser)
        router.replace('/profile')
    }, [authUser, loading, router])

    useEffect(() => {
      const auth = getAuth()
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = localStorage.getItem('emailForSignIn');
        if (!email) {
            email = window.prompt('Please provide your email for confirmation');
        }
        // The client SDK will parse the code from the link for you.
        return signInWithEmailLink(auth, email, window.location.href)
            .then((result) => {
                localStorage.removeItem('emailForSignIn');
            })
      }
    }, [])
  
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
      <div className="container vh-100 d-flex align-item-center">
        <Head>
          <title>GnG Auth App - Login</title>
          <meta name="description" content="Login page for GnG Auth App" />
        </Head>

        <main className="w-100 my-auto">
          <div className="container mt-3">
            <div className="row">
                <form onSubmit={loginWithEmail} className="card"> 
                  <div className="card-body">   
                    <h3 className="card-title">Login</h3>
                    
                    {emailSent && 
                      <div>
                        <p>Please verify your email address by clicking the link we sent* and follow the instructions on your broswer to finish signing up. </p>
              
                        <p> *It may take a few minutes for you to recieve the email. Please check spam folder if you don&apos;t see it in your inbox. </p>
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
                            <button type="submit" className="btn btn-primary"> Login </button>
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