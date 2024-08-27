import { Button } from 'react-bootstrap'
import videoHomepage from '../../assets/images/video-homepage.mp4'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    const nagivate = useNavigate();

    return (
        <div className="homepage-container">
            <div>
                <video autoPlay loop muted>
                    <source
                        src={videoHomepage}
                        type='video/mp4'
                    />
                </video>
            </div>
            <div className='homepage-content'>
                <div className='title-1'>
                    Make forms
                    worth filling out
                </div>
                <div className='title-2'>
                    {`Get more data—like signups, feedback, and anything else
                    —with forms designed to be refreshingly different.`}
                </div>
                <div className='homepage-button'>
                    {isAuthenticated === true ?
                        <button onClick={() => nagivate('/users')}>Doing Quiz Now</button>
                        :
                        <Button onClick={() => nagivate('/login')} className='btn-getstarted'>Get started-it's free</Button>
                    }

                </div>
            </div>
        </div>
    )
}

export default HomePage