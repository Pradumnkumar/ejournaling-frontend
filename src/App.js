import "./App.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import SignUp from "./SignUpForm/SignUp";
import Home from "./components/home/Home";
// import Registration from "./components/RegistrationForm/Registration";
import SectorAssessmentLandingPage from "./components/SectorAssessment/SectorAssessmentLanding";
import QuestionPage from "./components/SectorAssessment/Question/QuestionPage";
import Checkout from "./components/payments/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element={<Home />} />
        {/* <Route path = '/registration' element={<Registration />} /> */}
        <Route path = '/sector-assessments' element={<SectorAssessmentLandingPage />} />
        <Route path = '/sector-assessments/questions/:questionId' element={<QuestionPage />} />
        <Route path = '/payment' element={<Checkout /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
