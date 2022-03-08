import Head from 'next/head'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthUserContext';
import styles from '../styles/Home.module.css'

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
      setName(authUser.name)
      setEmail(authUser?.email)
      setPhoneNumber(authUser?.phoneNumber)
    }
  }, [authUser, loading, router])

  return (
    <div className={styles.container}>
      <Head>
        <title>GnG Auth App - Profile</title>
        <meta name="description" content="profile page for GnG Auth App" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>
            Profile
        </h3>
        {true && 
          <form onSubmit={logout} className={styles.card}>
            {/* <div> 
              <label for="name">Name</label>
              <input type="text"/>
            </div> */}

            <div> 
              <label htmlFor="email">Name</label>
              <input 
                id="email" 
                type="text"
                value={name} 
                disabled
                onChange={(event) => setEmail(event.target.value)} />
            </div>

            <div> 
              <label htmlFor="email">Email</label>
              <input 
                id="email" 
                type="text" 
                value={email}
                disabled
                onChange={(event) => setEmail(event.target.value)} />
            </div>

            <div> 
              <label htmlFor="email">Phone</label>
              <input 
                id="email" 
                type="text" 
                value={phoneNumber}
                disabled
                onChange={(event) => setEmail(event.target.value)} />
            </div>

            <div>
              <button type="submit"> Logout </button>
            </div>
          </form>
        }
      </main>
    </div>
  )
}

export default Profile;