import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDataQuiz, postSubmitQuiz } from '../../services/apiService';
import _ from 'lodash';
import './../User/DetailQuiz.scss'
import Question from './Question';
import { set } from 'nprogress';
import ModalResult from './ModalResult';
import RightContent from './Content/RightContent';

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState([]);

    useEffect(() => {
        fetchQuetions();
    }, [quizId])

    const fetchQuetions = async () => {
        let res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    })
                    return { questionId: key, answers, questionDescription, image }
                }
                )
                .value()
            console.log(data)
            setDataQuiz(data)
        }
    }

    const handleNext = () => {
        {
            dataQuiz.length > index + 1 ?
                setIndex(index + 1)
                :
                setIndex(index)
        }
    }

    const handlePrev = () => {
        {
            0 <= index - 1 ?
                setIndex(index - 1)
                :
                setIndex(index)
        }
    }

    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz); // react hook doesn't merge state
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            let b = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected
                }
                return item;
            })
            question.answers = b;
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone)
        }

    }


    const handleFinishQuiz = async () => {

        let payload = {
            quizId: +quizId,
            answers: []
        }
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];

                //to do
                question.answers.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id);
                    }
                })
                answers.push(
                    {
                        questionId: +questionId,
                        userAnswerId: userAnswerId
                    }
                )
            })

            payload.answers = answers
            // submit api
            let res = await postSubmitQuiz(payload);
            if (res && res.EC === 0) {
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setIsShowModalResult(true)
            } else {
                alert("something wrong ............")
            }
        }
    }


    return (
        <div className="detail-quiz-container">
            <div className='left-content'>
                <div className='title'>
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr />
                <div className='q-body'>
                    <img />
                </div>
                <div className='q-content'>
                    <Question
                        index={index}
                        handleCheckbox={handleCheckbox}
                        data={dataQuiz && dataQuiz.length > 0
                            ?
                            dataQuiz[index]
                            :
                            []
                        } />
                </div>
                <div className='footer'>
                    <button onClick={() => handlePrev()} className='btn btn-secondary'>
                        Prev
                    </button>
                    <button onClick={() => handleNext()} className='btn btn-primary mr-3'>
                        Next
                    </button>
                    <button onClick={() => handleFinishQuiz()} className='btn btn-warning mr-3'>
                        Finish
                    </button>
                </div>
            </div>
            <div className='right-content'>
                <RightContent
                    dataQuiz={dataQuiz}
                    handleFinishQuiz={handleFinishQuiz}
                    setIndex={setIndex}
                />
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    )
}

export default DetailQuiz;