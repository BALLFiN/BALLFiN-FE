import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/layout/Header";
import { AnimatePresence } from "framer-motion";

// Lazy loading 적용
const HomePage = lazy(() => import("./pages/HomePage"));
const IntroPage = lazy(() => import("./pages/introPage"));
const NewsPage = lazy(() => import("@/pages/news/newsPage"));
const NewsDetailPage = lazy(() => import("@/pages/news/NewsDetailPage"));
const StockPage = lazy(() => import("@/pages/stock/stockPage"));
const StockDetailPage = lazy(() => import("@/pages/stock/StockDetailPage"));
const LoginPage = lazy(() => import("@/pages/auth/loginPage"));
const SignUpPage = lazy(() => import("@/pages/auth/signUpPage"));
const MyPageLayout = lazy(() => import("./components/layout/myPageLayout"));
const MyPageChart = lazy(() => import("./pages/myPage/chart"));
const MyPageNews = lazy(() => import("./pages/myPage/news"));
const AramSettingsPage = lazy(() => import("./pages/myPage/aramSettings"));
const TransactionPage = lazy(
  () => import("@/pages/transaction/TransactionPage")
);
const MyPage = lazy(() => import("./pages/myPage"));
const ProfilePage = lazy(() => import("./pages/myPage/profile"));
const ChatPage = lazy(() => import("./pages/chatPage"));

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/stock" element={<StockPage />} />
        <Route path="/stock/:code" element={<StockDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mypage" element={<MyPageLayout />}>
          <Route index element={<MyPage />} />
          <Route path="chart" element={<MyPageChart />} />
          <Route path="news" element={<MyPageNews />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="aramSettings" element={<AramSettingsPage />} />
        </Route>
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <main className="pt-16">
            <Suspense fallback={<div />}>
              <AnimatedRoutes />
            </Suspense>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
