import { useState } from 'react';
import './../Question/Questions.scss'
import Select from 'react-select';
import { FiPlusSquare } from "react-icons/fi";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({});



    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: 'question 1',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: 'answer 1',
                        isCorrect: false
                    },
                    {
                        id: uuidv4(),
                        description: 'answer 2',
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
                                    />
                                    <label >Question {index + 1}'s description</label>
                                </div>

                                <div className='group-upload'>
                                    <label className='label-upload' htmlFor='labelUpload'><RiImageAddFill className='icon-add-image' /></label>
                                    <input hidden type='file' id='labelUpload'></input>
                                    <span>Upload Your Image</span>
                                </div>
                                <div className='btn-add'>
                                    <span className='icon-add' onClick={() => handleAddRemoveQuestion('ADD', '')}><FiPlusSquare /></span>
                                    {questions.length > 1 &&
                                        <span className='icon-remove' onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}><IoIosRemoveCircleOutline /></span>
                                    }

                                </div>

                            </div>
                            {question.answers && question.answers.map((answer, index) => {
                                return (
                                    <div key={answer.id} className='answers-content'>
                                        <input className="form-check-input iscorrect"
                                            type="checkbox"
                                        />
                                        <div className="form-floating answer-name">
                                            <input
                                                type="text"
                                                class="form-control"
                                                placeholder="name@example.com"
                                                value={answer.description}
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

            </div>
        </div>
    )
}

export default Questions;