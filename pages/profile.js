import Head from 'next/head'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import { getAuth, updateProfile, updateEmail, sendEmailVerification  } from "firebase/auth";

const Profile = () => {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  
  const [editing, setEditing] = useState(false)

  const router = useRouter();
  const { authUser, loading, logout } = useAuth();

  useEffect(() => {
    console.log(authUser)
    if (!loading && !authUser)
      router.push('/')
    else {
      setName(authUser?.name || '')
      setEmail(authUser?.email || '')
      setPhoneNumber(authUser?.phoneNumber || '')
    }
  }, [authUser, loading, router])

  const revertEdit = event => {
    setName(authUser?.name)
    setEmail(authUser?.email)
    setPhoneNumber(authUser?.phoneNumber)
    setEditing(false)
  }

  const _updateProfile = () => {
    const auth = getAuth()
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        console.log('Profile Updated!')
      })
      .catch(e => {
        console.error(e)
      })
    if (email != authUser.email) {
      updateEmail(auth.currentUser, email)
        .then(() => {
          sendEmailVerification(auth.currentUser)
        })
    }
    setEditing(false)
    event.preventDefault();
  }

  return (
    <div className="container vh-100 d-flex align-item-center">
      <Head>
        <title>GnG Auth App - Profile</title>
        <meta name="description" content="profile page for GnG Auth App" />
      </Head>

      <main className="w-100 my-auto">
        <div className="container mt-3">
          <div className="row"> 
            <form onSubmit={_updateProfile} className="card">  
              <div className="card-body">
                <h3 className="card-title">Profile</h3>
                <div className="mb-3"> 
                  <label htmlFor="name" className="form-label">Name</label>
                  <input 
                    className="form-control"
                    id="name" 
                    type="text"
                    value={name} 
                    disabled={!editing}
                    onChange={(event) => setName(event.target.value)} />
                </div>
    
                <div className="mb-3"> 
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    className="form-control"
                    id="email" 
                    type="text" 
                    value={email}
                    disabled={!editing}
                    onChange={(event) => setEmail(event.target.value)} />
                </div>
    
                <div className="mb-3"> 
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input 
                    className="form-control"
                    id="phone" 
                    type="text" 
                    value={phoneNumber}
                    disabled={!editing}
                    onChange={(event) => setPhoneNumber(event.target.value)} />
                </div>
    
                <div>
                  {!editing && 
                    <div>
                      <button onClick={() => setEditing(true)} className="btn btn-primary me-2"> Edit </button> 
                      <button onClick={logout} className="btn btn-danger"> Logout </button>
                    </div>
                  }
                  {editing && 
                    <div>
                      <button type="submit" className="btn btn-primary me-2"> Save </button>
                      <button onClick={revertEdit} className="btn btn-danger"> Cancel </button>
                    </div>
                  }
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