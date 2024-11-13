// QuestionPage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RadioChangeEvent } from 'antd';
import { Input, Radio, Space } from 'antd';
import { submitAssessmentRun } from '../../../features/sectorAssessments/sectorAssessmentActions';

const QuestionPage = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedChoices, setSelectedChoices] = useState({});

  useEffect(()=>{
    const savedSelectedChoices = JSON.parse(localStorage.getItem('sectorAssessmentSelectedChoices'));
    if(savedSelectedChoices){
      setSelectedChoices(savedSelectedChoices);
    }
  },[])

  const { data: assessmentData, status: assessmentStatus , error: assessmentError } = useSelector((state) => state.sectorAssessment.assessment);
  let assessment = assessmentData;

  const { data: assessmentRunData, status: assessmentRunStatus , error: assessmentRunError } = useSelector((state) => state.sectorAssessment.assessmentRun);
  let assessmentRun = assessmentRunData;

  const user = useSelector((state) => state.user);
  
  if (!assessment) {
    assessment = JSON.parse(localStorage.getItem('sectorAssessment'));
  }
  
  if (!assessmentRun) {
    assessmentRun = JSON.parse(localStorage.getItem('sectorAssessmentRun'));
  }

  const questionIndex = parseInt(questionId, 10);
  const question = assessment[0].questions[questionIndex];

  const saveAssessmentRun = ({question_id, choice_id}) => {
    if (!assessmentRun){
      assessmentRun = {
        'assessment': assessment[0].id,
        'user': user.email,
        'question_counter': 0,
        'question_attempt': [],
        'time_taken': '00:00:00',
        'is_finished': false,
      }
    }

    // Check if the question_id already exists in question_attempt
    const existingAttemptIndex = assessmentRun.question_attempt.findIndex(
      (attempt) => attempt.question === question_id
    );
  
    if (existingAttemptIndex !== -1) {
      // Update the existing attempt
      assessmentRun.question_attempt[existingAttemptIndex].choice = choice_id;
    } else {
      // Append a new attempt
      assessmentRun.question_attempt.push({
        user: user.email,
        question: question_id,
        choice: choice_id,
      });
    }
    localStorage.setItem('sectorAssessmentRun', JSON.stringify(assessmentRun));
  }

  const handleNext = () => {
    saveAssessmentRun({ question_id: question.id, choice_id: selectedChoices[question.id] });
    localStorage.setItem('sectorAssessmentSelectedChoices', JSON.stringify(selectedChoices));
    if (questionIndex < assessment[0].questions.length - 1) {
      navigate(`/sector-assessments/questions/${questionIndex + 1}`);
    }
  };

  const handlePrevious = () => {
    saveAssessmentRun({ question_id: question.id, choice_id: selectedChoices[question.id] });
    localStorage.setItem('sectorAssessmentSelectedChoices', JSON.stringify(selectedChoices));
    if (questionIndex > 0) {
      navigate(`/sector-assessments/questions/${questionIndex - 1}`);
    }
  };

  const handleFinish = () => {
    saveAssessmentRun({ question_id: question.id, choice_id: selectedChoices[question.id] });
    localStorage.setItem('sectorAssessmentSelectedChoices', JSON.stringify(selectedChoices));
    dispatch(submitAssessmentRun(assessmentRun));
  }
  
  const onChange = (e: RadioChangeEvent) => {
    setSelectedChoices({...selectedChoices, [question.id]: e.target.value});
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>{question.title}</h2>
      {question.question_image && <img src={question.question_image} alt={question.title} />}
      <p>{question.question_text}</p>
      <Radio.Group onChange={onChange} value={selectedChoices[question.id]}>
        <Space direction="vertical">
        {question.choices.map((choice) => (
          <Radio key={choice.id} value={choice.id}>
            { choice.choice_image ? <img src={choice.choice_image} alt={choice.choice_image}/> : choice.choice_text }
          </Radio>
        ))}
          <Space direction="horizontal">
            <button onClick={handlePrevious} disabled={questionIndex === 0}>
              Previous
            </button>
            { (questionIndex !== assessment[0].questions.length - 1) ?
              <button onClick={handleNext} disabled={questionIndex === assessment[0].questions.length - 1}>
                Next
              </button>
              :
              <button onClick={handleFinish} disabled={questionIndex !== assessment[0].questions.length - 1}>
                Finish Test
              </button>
            }
          </Space>
        </Space>
      </Radio.Group>
    </>
  );
};

export default QuestionPage;
