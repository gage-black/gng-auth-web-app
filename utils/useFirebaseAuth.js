import './firebase'
import { useState, useEffect } from 'react'
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, signOut, onAuthStateChanged } from 'firebase/auth'

const formatAuthUser = (user) => ({
    uid: user.uid,
    email: user.email || '',
    phoneNumber: user.phoneNumber || '',
    name: user.name || ''
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
                window.localStorage.setItem('emailForSignIn', email);
            })
    }

    const confirmSignIn = function (href) {
        const auth = getAuth();
        if (isSignInWithEmailLink(auth, href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }
            // The client SDK will parse the code from the link for you.
            return signInWithEmailLink(auth, email, href)
                .then((result) => {
                    window.localStorage.removeItem('emailForSignIn');
                })
        }
    }

    const login  = (email) => {
        const auth = getAuth()
        return signInWithEmailLink(auth, email, window.location.href)
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
        confirmSignIn,
        login,
        logout
    }
}