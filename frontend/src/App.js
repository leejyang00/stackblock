import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import UserProfile from "./components/Profile/UserProfile";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AskQuestion from "./pages/AskQuestion";
import QuestionProfile from "./components/Question/questionProfile";
import OtherUserProfile from "./components/Profile/OtherUserProfile";
// import { useCookies } from "react-cookie";
import VerifiedPage from "./pages/VerifiedPage";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePasswordSucceed from "./pages/ChangePasswordSucceed";

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/user/change-password/:userId/:token"
              element={<ChangePassword />}
            />
            <Route path="/change-password-succeed" element={<ChangePasswordSucceed />} />
            <Route
              path="/user/verify/:userId/:token"
              element={<VerifiedPage />}
            />
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
  );
};

export default App;
