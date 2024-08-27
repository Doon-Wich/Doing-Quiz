import { useState } from 'react';
import './../Auth/Login.scss'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { postLogin } from '../../services/apiService';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner10 } from "react-icons/im";

const Login = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const nagivate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);


    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid Email !");
            return;
        }

        if (!password) {
            toast.error("Invalid Password");
            return;
        }
        setIsLoading(true);
        // submit apis
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            toast.success("Login succeed");
            setIsLoading(false)
            nagivate('/')
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false)
        }
    }

    return (
        <div className="login-container">
            <div className='header'>
                Don't have an account yet?
                <button>Sign up</button>
            </div>
            <div className='title col-4 mx-auto'>
                Cayman
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who's this ?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type={"email"}
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        type={"password"}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <span>Forgot password ?</span>
                </div>

                <div className='btn-login'>
                    
                    <button 
                        onClick={() => handleLogin()}
                        disabled = {isLoading}
                    >   
                        <div>
                        {isLoading === true && <ImSpinner10 className='loader-icon'/>}
                        
                        <span>Login to Cayman</span>
                        </div>      
                    </button>
                </div>
                <div className='back'>
                    <span onClick={() => { nagivate('/') }}> &#60;&#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Login;