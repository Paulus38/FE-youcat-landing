import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '@context/AuthContext';
import { LanguageProvider } from '@context/LanguageContext';
import { BuildProvider } from '@context/BuildContext';
import theme from '@theme/index';

// Layouts
import MainLayout from '@layouts/MainLayout';

// Pages
import HomePage from '@pages/home/HomePage';
import LoginPage from '@pages/auth/LoginPage';
import RegisterPage from '@pages/auth/RegisterPage';
import ProfilePage from '@pages/profile/ProfilePage';
import CreateExamPage from '@pages/exam/CreateExamPage';
import TakeExamPage from '@pages/exam/TakeExamPage';
import ExamResultPage from '@pages/exam/ExamResultPage';
import CreateQuizPage from '@pages/quiz/CreateQuizPage';
import QuizListPage from '@pages/quiz/QuizListPage';
import QuizDetailPage from '@pages/quiz/QuizDetailPage';
import QuizPlayPage from '@pages/quiz/QuizPlayPage';
import QuizResultPage from '@pages/quiz/QuizResultPage';
import QuizSingleQuestionPage from '@pages/quiz/QuizSingleQuestionPage';
import LeaderboardPage from '@pages/leaderboard/LeaderboardPage';
import AboutPage from '@pages/about/AboutPage';
import ContactPage from '@pages/contact/ContactPage';
import TermsPage from '@pages/legal/TermsPage';
import PrivacyPage from '@pages/legal/PrivacyPage';
import NotFoundPage from '@pages/error/NotFoundPage';
import CatechismPage from '@pages/catechism/CatechismPage';
import YoucatPage from '@pages/catechism/YoucatPage'; 

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LanguageProvider>
          <BuildProvider>
            <Router>
              <AuthProvider>
                <Routes>
                  <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="auth/login" element={<LoginPage />} />
                    <Route path="auth/register" element={<RegisterPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="exam/create" element={<CreateExamPage />} />
                    <Route path="exam/take/:examId" element={<TakeExamPage />} />
                    <Route path="exam/result/:resultId" element={<ExamResultPage />} />
                    <Route path="quiz">
                      <Route index element={<QuizListPage />} />
                      <Route path="create" element={<CreateQuizPage />} />
                      <Route path="detail/:id" element={<QuizDetailPage />} />
                      <Route path=":id/play" element={<QuizPlayPage />} />
                      <Route path=":id/result" element={<QuizResultPage />} />
                      <Route path="single-question/:id" element={<QuizSingleQuestionPage />} />
                    </Route>
                    <Route path="catechism" element={<CatechismPage />} />
                    <Route path="catechism/youcat" element={<YoucatPage />} />
                    
                    <Route path="leaderboard" element={<LeaderboardPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="terms" element={<TermsPage />} />
                    <Route path="privacy" element={<PrivacyPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Routes>
              </AuthProvider>
            </Router>
          </BuildProvider>
        </LanguageProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
