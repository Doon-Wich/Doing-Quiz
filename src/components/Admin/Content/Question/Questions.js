import { useState } from 'react';
import './../Question/Questions.scss'
import Select from 'react-select';
import { FiPlusSquare } from "react-icons/fi";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from "yet-another-react-lightbox";

const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [isPreviewImage, setIsPreviewImage] = useState(false);

    const [dataImagePreview, serDataImagePreview] = useState({
        url: ''
    });


    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    },
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            },
        ]
    )

    const handleAddRemoveQuestion = (type, id) => {
        if (type === "ADD") {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
            setQuestions([...questions, newQuestion])
        }

        if (type === "REMOVE") {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestions(questionsClone);
        }
    }

    const handleAddRemoveAnswer = (type, id, questionId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === "ADD") {
            const newAnswer =
            {
                id: uuidv4(),
                description: '',
                isCorrect: false
            };
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
        }

        if (type === "REMOVE") {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== id)
            setQuestions(questionsClone);
        }
    }

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }
        }
    }

    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            console.log(questionsClone);
            setQuestions(questionsClone);
        }
    }

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let qindex = questionsClone.findIndex(item => item.id === questionId);
        if (qindex > -1) {
            let aindex = questionsClone[qindex].answers.findIndex(item => item.id === answerId);
            if (type === 'CHECKBOX') {
                questionsClone[qindex].answers[aindex].isCorrect = questionsClone[qindex].answers[aindex].isCorrect = value;
            }
            if (type === 'INPUT') {
                questionsClone[qindex].answers[aindex].description = questionsClone[qindex].answers[aindex].description = value;
            }

            console.log(questionsClone);
            setQuestions(questionsClone);
        }
    }

    const handleSubmitQuestionForQuiz = () => {

    }

    const handlePreviewImage = (questionId) => {

        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            serDataImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile)
            });
            setIsPreviewImage(true);
        }
    }

    return (
        <div className="questions-container">
            <div className="title">
                Manage Question
            </div>
            <div className='add-new-questions'>
                <div className='col-6 form-group'>
                    <lable>Select Quiz:</lable>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>
                <div className='mt-3'>
                    Add Questions:
                </div>
                {questions && questions.map((question, index) => {
                    return (
                        <div key={question.id} className='q-main mb-4'>
                            <div className='questions-content'>

                                <div className="form-floating description">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="name@example.com"
                                        value={question.description}
                                        onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                    />
                                    <label >Question {index + 1}'s description</label>
                                </div>

                                <div className='group-upload'>
                                    <label className='label-upload' htmlFor={`${question.id}`}><RiImageAddFill className='icon-add-image' /></label>
                                    <input
                                        hidden
                                        type='file'
                                        id={`${question.id}`}
                                        onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                    ></input>
                                    <span>
                                        {question.imageFile ?
                                            <span style={{ cursor: "pointer" }}
                                                onClick={() => handlePreviewImage(question.id)}>
                                                {question.imageName}
                                            </span>
                                            :
                                            'Upload Your Image'
                                        }
                                    </span>


                                </div>
                                <div className='btn-add'>
                                    <span className='icon-add' onClick={() => handleAddRemoveQuestion('ADD', '')}><FiPlusSquare /></span>
                                    {questions.length > 1 &&
                                        <span className='icon-remove' onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}><IoIosRemoveCircleOutline /></span>
                                    }

                                </div>
                            </div>

                            {question.answers && question.answers.length > 0
                                && question.answers.map((answer, index) => {
                                    return (
                                        <div key={answer.id} className='answers-content'>
                                            <input className="form-check-input iscorrect"
                                                type="checkbox"
                                                checked={answer.isCorrect}
                                                onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                                            />
                                            <div className="form-floating answer-name">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="name@example.com"
                                                    value={answer.description}
                                                    onChange={(event) => handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)}
                                                />
                                                <label >Answer {index + 1} </label>
                                            </div>
                                            <div className='btn-group'>
                                                <span className='icon-add' onClick={() => handleAddRemoveAnswer("ADD", "", question.id)}><FiPlusSquare /></span>
                                                {
                                                    question.answers.length > 1 &&
                                                    <span className='icon-remove'
                                                        onClick={() => handleAddRemoveAnswer("REMOVE", answer.id, question.id)}
                                                    ><IoIosRemoveCircleOutline /></span>
                                                }

                                            </div>
                                        </div>
                                    )
                                })}

                        </div>
                    )
                })
                }

                {
                    questions && questions.length > 0 &&
                    <div>
                        <button
                            onClick={() => handleSubmitQuestionForQuiz()}
                            className='btn btn-warning'>Save Questions</button>
                    </div>
                }

                {isPreviewImage === true &&
                    <Lightbox
                        open={isPreviewImage}
                        close={() => (setIsPreviewImage(false), console.log('adu'))}
                        slides={[
                            {
                                src: dataImagePreview.url,
                            }
                        ]}
                        render={{
                            buttonPrev: () => null,
                            buttonNext: () => null,
                        }}

                    >
                        {console.log(dataImagePreview.url)}
                    </Lightbox>
                }

            </div>
        </div>
    )
}

export default Questions;