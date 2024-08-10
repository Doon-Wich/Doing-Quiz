import { Button } from 'react-bootstrap'
import videoHomepage from '../../assets/images/video-homepage.mp4'

const HomePage = () => {
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
                    <Button className='btn-getstarted'>Get started-it's free</Button>
                </div>
            </div>
        </div>
    )
}

export default HomePage