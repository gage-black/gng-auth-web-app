import './firebase'
import { useState, useEffect } from 'react'
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, signOut, onAuthStateChanged } from 'firebase/auth'

const formatAuthUser = (user) => ({
    uid: user.uid,
    email: user.email || '',
    phoneNumber: user.phoneNumber || '',
    name: user.displayName || ''
})

export default function useFirebaseAuth() {
    // const [firebase, setFirebase] = useState(firebase)
    const [authUser, setAuthUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const authStateChagned = async (authState) => {
        if (!authState) {
            setAuthUser(null)
            setLoading(false)
            return
        }

        setLoading(true)
        var formmatedUser = formatAuthUser(authState)
        setAuthUser(formmatedUser)
        setLoading(false)
    }

    const clear = () => {
        setAuthUser(null)
        setLoading(null)
    }

    const signUp = (email) => {
        const auth = getAuth()
        const actionCodeSettings = {
            url: process.env.NEXT_PUBLIC_BASE_URL + 'login',
            handleCodeInApp: true
          };
        return sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then((result) => {
                localStorage.setItem('emailForSignIn', email);
            })
    }

    const logout = () => {
        const auth = getAuth()
        return signOut(auth).then(clear)
    }

    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, authStateChagned)
        return () => unsubscribe();
    }, [])

    return {
        authUser,
        loading,
        signUp,
        logout
    }
}