import _ from "lodash";
import './../User/DetailQuiz.scss'
import Lightbox from "yet-another-react-lightbox";
import { useEffect, useState } from 'react';

const Question = (props) => {
    const [isPreviewImage, setIsPreviewImage] = useState(false);

    const { data, index } = props
    if (_.isEmpty(data)) {
        return (
            <>
            </>
        )
    }

    const handleHandleCheckbox = (event, aId, qId) => {
        props.handleCheckbox(aId, qId)
    }

    return (
        <>
            {data.image ?
                <div className="q-image">
                    <img
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsPreviewImage(true)}
                        src={`data:image/jpeg;base64, ${data.image}`}
                    ></img>
                    {isPreviewImage === true &&
                        <Lightbox
                            open={isPreviewImage}
                            close={() => (setIsPreviewImage(false), console.log('adu'))}
                            slides={[
                                {
                                    src: `data:image/jpeg;base64, ${data.image}`
                                }
                            ]}
                            render={{
                                buttonPrev: () => null,
                                buttonNext: () => null,
                            }}

                        >
                        </Lightbox>
                    }
                </div >
                :
                <div className="q-image">

                </div>
            }

            <div className='question'>
                Question {index + 1}: {data.questionDescription} ?
            </div>
            <div className='answer'>
                {data.answers && data.answers.length &&
                    data.answers.map((a, index) => {
                        return (
                            <div key={`answer-${index}`}
                                className='a-child'>
                                <div className="form-check">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        checked={a.isSelected}
                                        onChange={(event) => handleHandleCheckbox(event, a.id, data.questionId)}
                                    />
                                    <label className="form-check-label">
                                        {a.description}
                                    </label>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Question;