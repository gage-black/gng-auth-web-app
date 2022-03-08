import Head from 'next/head'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';

const Profile = () => {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const router = useRouter();
  const { authUser, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !authUser)
      router.push('/')
    else {
      setName(authUser?.name)
      setEmail(authUser?.email)
      setPhoneNumber(authUser?.phoneNumber)
    }
  }, [authUser, loading, router])

  return (
    <div className="container vh-100 d-flex align-item-center">
      <Head>
        <title>GnG Auth App - Profile</title>
        <meta name="description" content="profile page for GnG Auth App" />
      </Head>

      <main className="w-100 my-auto">
        <div className="container mt-3">
          <div className="row"> 
            <form onSubmit={logout} className="card">  
              <div className="card-body">
                <h3 className="card-title">Profile</h3>
                <div className="mb-3"> 
                  <label htmlFor="email" className="form-label">Name</label>
                  <input 
                    className="form-control"
                    id="email" 
                    type="text"
                    value={name} 
                    disabled
                    onChange={(event) => setEmail(event.target.value)} />
                </div>
    
                <div className="mb-3"> 
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    className="form-control"
                    id="email" 
                    type="text" 
                    value={email}
                    disabled
                    onChange={(event) => setEmail(event.target.value)} />
                </div>
    
                <div className="mb-3"> 
                  <label htmlFor="email" className="form-label">Phone</label>
                  <input 
                    className="form-control"
                    id="email" 
                    type="text" 
                    value={phoneNumber}
                    disabled
                    onChange={(event) => setEmail(event.target.value)} />
                </div>
    
                <div>
                  <button type="submit" className="btn btn-danger"> Logout </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile;