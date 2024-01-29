import React from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const GoogleAuth = () => {
    return (
        <div>
            <GoogleOAuthProvider clientId="431471957866-ked37f8n5hijg3hmpu1sh64e9u9spanh.apps.googleusercontent.com">

                <GoogleLogin
                    onSuccess={credentialResponse => {
                        const decoded = jwtDecode(credentialResponse.credential);
                        console.log(decoded);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />


            </GoogleOAuthProvider>
        </div>
    )
}

export default GoogleAuth