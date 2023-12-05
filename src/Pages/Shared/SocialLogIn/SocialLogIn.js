import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { getJWT } from '../../../utilities/getJWT';

const SocialLogIn = () => {
    const location = useLocation();
    const navigate = useNavigate;
    const from = location.state?.from?.pathname || '/';
    const { googleSignIn } = useContext(AuthContext);

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log(user)
                getJWT(user)
                navigate(from, { replace: true })

            })
            .catch(err => {
                console.error('google sign in error', err)
            })
    }
    return (
        <div>
            <p className=' text-center'><span>Social Login</span></p>
            <p className=' text-center'><button onClick={handleGoogleSignIn} className=' btn btn-ghost'>Google</button></p>
        </div>
    );
};

export default SocialLogIn;