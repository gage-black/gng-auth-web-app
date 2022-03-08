import '../../utils/firebase'
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: process.env.NEXT_BASE_URL + 'user/profile',
  // This must be true.
  handleCodeInApp: true
};

const auth = getAuth();
  
export default async function handler(req, res) {
  const { email } = req
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
  } catch (e) {
    return res.status(500).json(e)
  }

  // TODO save user object
  window.localStorage.setItem('emailForSignIn', email);
  return res.status(200).json({success: true})
}
  