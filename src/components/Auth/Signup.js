import './../Auth/Signup.scss';
import logo from './../../assets/images/signup.webp'
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useState } from 'react';
import { postRegister } from '../../services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const nagivate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("")

    const [pass, SetPass] = useState("password")
    const [show, setShow] = useState("show")
    const [hide, setHide] = useState("hide")

    const handleShowPass = () => {
        setShow("hide");
        setHide("show");
        SetPass("text");
    }

    const handleHidePass = () => {
        setShow("show");
        setHide("hide");
        SetPass("password");
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSignup = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid Email !");
            return;
        }

        if (!username) {
            toast.error("Invalid Username !");
            return;
        }

        if (!password) {
            toast.error("Invalid Password");
            return;
        }

        // submit apis
        let data = await postRegister(email, password, username);
        if (data && data.EC === 0) {
            toast.success("Sign Up succeed");
            nagivate('/login')
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <div className="signup-container">

            <div className="side-bar">
                <div>
                    <span>Sign up </span>
                    <span>and come on in</span>
                </div>
                <img src={logo} ></img>
            </div>
            <div className='content'>
                <div className="header">
                    Already have an account ?
                    <button>Log in</button>
                </div>
                <div className="title col-4 mx-auto">
                    Cayman
                </div>
                <div className="welcome col-4 mx-auto">
                    Get better data with conversational forms, surveys, quizzes & more.
                </div>
                <div className="content-form col-4 mx-auto">
                    <div className='input'>
                        <input
                            type={'email'}
                            placeholder='Email'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className='input'>
                        <input
                            type={'text'}
                            placeholder='Username'
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className='input'>
                        <span className='password-container'>
                            <input
                                className='password'
                                type={pass}
                                placeholder='Password'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <button className='display'>
                                <span ><BsFillEyeFill className={show} onClick={() => handleShowPass()} /></span>
                                <span ><BsFillEyeSlashFill className={hide} onClick={() => handleHidePass()} /></span>
                            </button>
                        </span>
                    </div>

                    <div className='form-group'>
                        <label>
                            <input
                                type='checkbox'
                            />
                            I agree to Typeform's Terms of Service, Privacy Policy
                            and Data Processing Agreement.
                        </label>
                    </div>
                    <div className='btn-signup'>
                        <button onClick={() => handleSignup()}>Create my free account</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signup;