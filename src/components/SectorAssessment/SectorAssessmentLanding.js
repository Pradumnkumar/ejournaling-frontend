// SectorAssessmentLandingPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAssessment } from '../../features/sectorAssessments/sectorAssessmentActions'
import { Link } from 'react-router-dom';

const SectorAssessmentLandingPage = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.sectorAssessment.assessment);

  useEffect(() => {
   if (status === 'idle'){
    dispatch(getAssessment());
   }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Sector Assessment</h1>
      <ul>
        {data[0].questions.map((question, index) => (
          <li key={question.id}>
            <Link to={`questions/${index}`}>{question.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectorAssessmentLandingPage;
