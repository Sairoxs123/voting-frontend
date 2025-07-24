import {auth} from "../../firebase"
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink, type ActionCodeSettings } from "firebase/auth"

const generateRandomString = (length: number) => {
let result = '';
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321';
const charactersLength = characters.length;
for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
}
return result;
};


const sendVerificationEmail = async (email : string) => {
    try {
        const verification_string = generateRandomString(128);
        const actionCodeSettings : ActionCodeSettings = {
            url : `http://localhost:5173/verify/${verification_string}`,
            handleCodeInApp : true
        }
        await sendSignInLinkToEmail(auth, email, actionCodeSettings).then(() => {
            window.localStorage.setItem("emailForSignIn", email)
            window.localStorage.setItem("verification_string", verification_string)
        })
    } catch (error) {
        console.error(error)
    }
}

const verifySignIn = async (verification_string : string | undefined) => {
    try {
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.localStorage.getItem("emailForSignIn")
            if (email) {
                const result = await signInWithEmailLink(auth, email, window.location.href)
                window.localStorage.removeItem("emailForSignIn")
                if (result.user.emailVerified && verification_string == window.localStorage.getItem("verification_string")) {
                    window.localStorage.removeItem("verification_string")
                    return true
                }
            }
        } else {
            return false
        }
    } catch (error) {
        console.error(error)
        return false
    }
    return false
}

export {sendVerificationEmail, verifySignIn}
