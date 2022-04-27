import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/Home';
import UserProfile from './components/Profile/UserProfile';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AskQuestion from './pages/AskQuestion';
import QuestionProfile from './components/Question/questionProfile';
import OtherUserProfile from './components/Profile/OtherUserProfile';

const App = () => {

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/ask-a-question" element={<AskQuestion />} />
            <Route path="/question/:questionID" element={<QuestionProfile />} />
            <Route path="/user/:userId" element={<OtherUserProfile />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App;
