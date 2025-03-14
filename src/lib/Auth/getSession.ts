import { getUser } from "./config";
import { AuthSessionInterface } from "../../types/authInterface";

const SIX_HOURS_IN_MILLISECONDS = 6 * 60 * 60 * 1000;




const updateLastRequestDate = () => {
    const lastRequest: string | null = localStorage.getItem('lastRequestDate');
    const now: Date = new Date();

    if (!lastRequest) {
        // No previous date, set current date
        localStorage.setItem('lastRequestDate', now.toISOString());
        return true; // Session is valid
    } else {
        const lastRequestDate: Date | number = new Date(lastRequest);
        const timeDifference = Number(now) - Number(lastRequestDate);

        if (timeDifference > SIX_HOURS_IN_MILLISECONDS) {
            // More than 6 hours of inactivity
            console.log("over 6 hours")
            localStorage.removeItem('lastRequestDate');
            return false; // Session expired
        } else {
            // Update the last request date
            console.log("less 6 hours")
            localStorage.setItem('lastRequestDate', now.toISOString());
            return true; // Session is valid
        }
    }
};

const getSession = ():Promise<AuthSessionInterface> => {
    const cognitoUser = getUser()
    const isSessionValid = updateLastRequestDate();

    if (!isSessionValid) {
        cognitoUser.signOut()
        window.location.href = '/signin';
        throw new Error('Session expired due to inactivity');
    }

    if (cognitoUser && isSessionValid) {
        return new Promise((resolve, reject): void => {
            cognitoUser.getSession((err: any, session: any) => {
                if (err) {
                    reject(err.message || JSON.stringify(err))
                } else {
                    // console.log('Session: ', session);
                    const id: string = session.accessToken.payload.sub;
                    const accessToken: string= session.accessToken.jwtToken;
                    const email: string =  session.idToken.payload.email;
                    resolve({
                        id,
                        accessToken,
                        email
                    })
                }
            })
        })
    } else {
        throw new Error('no cognitiveUser value')
    }
}


export default getSession