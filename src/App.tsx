import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages/homePage';
import IntroPage from './pages/introPage';
import NewsPage from '@/pages/news/newsPage';
import StockPage from '@/pages/stock/stockPage';
import LoginPage from '@/pages/auth/loginPage';
import SignUpPage from '@/pages/auth/signUpPage';
import MyPage from '@/pages/myPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyPageLayout from './components/layout/myPageLayout';

import AramPage from './pages/myPage/Aram';
import SettingsPage from './pages/myPage/Settings';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <main className="pt-16">
            <Routes>
              <Route path="/intro" element={<IntroPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/stock" element={<StockPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/mypage" element={<MyPageLayout />}>
                <Route index element={<MyPage />} />
                <Route path="aram" element={<AramPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
